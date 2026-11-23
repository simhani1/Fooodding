package com.fooding.api.notification.service.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.repository.EmitterRepository;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.DistributionSummary;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import lombok.extern.slf4j.Slf4j;

/**
 * Multi-instance SSE.
 * - Each instance keeps its own emitters in memory (an HTTP response cannot be shared).
 * - Every connection is recorded in Redis as sse:conn:{foodTruckId}:{emitterId} = instanceId (TTL, refreshed by heartbeat),
 *   so a crashed instance's connections disappear by themselves.
 * - Events go through one Redis Pub/Sub channel; every instance receives them and writes only to its local emitters.
 */
@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService, MessageListener {

	public static final String CHANNEL = "sse:events";
	static final String CONN_KEY_PREFIX = "sse:conn:";
	static final long EMITTER_TIMEOUT_MS = Duration.ofMinutes(30).toMillis();
	static final long HEARTBEAT_INTERVAL_MS = 10_000L;
	static final long CONN_TTL_SECONDS = 30L;

	private final EmitterRepository emitterRepository;
	private final StringRedisTemplate redisTemplate;
	private final ObjectMapper objectMapper;
	private final MeterRegistry meterRegistry;
	private final String instanceId;
	private final AtomicInteger registryConnections = new AtomicInteger();
	private final Counter publishFailed;
	private final Timer pubsubLatency;

	public NotificationServiceImpl(EmitterRepository emitterRepository, StringRedisTemplate redisTemplate,
		ObjectMapper objectMapper, MeterRegistry meterRegistry,
		@Value("${app.instance-id:${HOSTNAME:local}}") String instanceId) {
		this.emitterRepository = emitterRepository;
		this.redisTemplate = redisTemplate;
		this.objectMapper = objectMapper;
		this.meterRegistry = meterRegistry;
		this.instanceId = instanceId;
		Gauge.builder("sse.connections.local", emitterRepository, EmitterRepository::count)
			.description("SSE connections held by this instance").register(meterRegistry);
		Gauge.builder("sse.connections.registry", registryConnections, AtomicInteger::get)
			.description("SSE connections recorded in Redis (cluster-wide)").register(meterRegistry);
		this.publishFailed = Counter.builder("sse.events.publish.failed").register(meterRegistry);
		this.pubsubLatency = Timer.builder("sse.pubsub.latency")
			.description("publish on any instance -> delivered by this instance")
			.publishPercentileHistogram().register(meterRegistry);
	}

	record SseMessage(Long foodTruckId, String name, String data, String origin, long publishedAt) {
	}

	@Override
	public SseEmitter subscribe(Long foodTruckId, Object snapshot) {
		String emitterId = UUID.randomUUID().toString();
		SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT_MS);
		Runnable cleanup = () -> {
			emitterRepository.remove(foodTruckId, emitterId);
			unregister(foodTruckId, emitterId);
		};
		emitter.onCompletion(cleanup);
		emitter.onTimeout(emitter::complete);
		emitter.onError(e -> log.info("SSE error ft={} emitter={} : {}", foodTruckId, emitterId, e.getMessage()));

		emitterRepository.save(foodTruckId, emitterId, emitter);
		register(foodTruckId, emitterId);
		try {
			send(emitter, "connected", toJson(snapshot));
		} catch (IOException e) {
			emitter.completeWithError(e);
		}
		return emitter;
	}

	@Override
	public void publish(Long foodTruckId, String name, Object data) {
		try {
			SseMessage message = new SseMessage(foodTruckId, name, toJson(data), instanceId, System.currentTimeMillis());
			redisTemplate.convertAndSend(CHANNEL, objectMapper.writeValueAsString(message));
			meterRegistry.counter("sse.events.published", "event", name).increment();
		} catch (Exception e) {
			// The waiting row is already committed; a lost notification is recovered by the owner's next snapshot.
			publishFailed.increment();
			log.error("SSE publish failed ft={} event={}", foodTruckId, name, e);
		}
	}

	/**
	 * Redis listener thread. ponytail: sends synchronously here — one stalled owner socket blocks this dispatch thread
	 * until Nginx send_timeout cuts it. Add a bounded per-connection queue if owners on bad networks become common.
	 */
	@Override
	public void onMessage(Message message, byte[] pattern) {
		SseMessage event;
		try {
			event = objectMapper.readValue(message.getBody(), SseMessage.class);
		} catch (IOException e) {
			log.error("Malformed SSE message: {}", new String(message.getBody(), StandardCharsets.UTF_8), e);
			return;
		}
		Map<String, SseEmitter> local = emitterRepository.findByFoodTruckId(event.foodTruckId());
		if (local.isEmpty()) {
			return;
		}
		pubsubLatency.record(System.currentTimeMillis() - event.publishedAt(), TimeUnit.MILLISECONDS);
		String route = instanceId.equals(event.origin()) ? "local" : "cross_instance";
		local.forEach((emitterId, emitter) -> {
			try {
				send(emitter, event.name(), event.data());
				meterRegistry.counter("sse.events.delivered", "event", event.name(), "route", route).increment();
			} catch (IOException | IllegalStateException e) {
				meterRegistry.counter("sse.events.delivery.failed", "event", event.name()).increment();
				emitterRepository.remove(event.foodTruckId(), emitterId);
				unregister(event.foodTruckId(), emitterId);
				emitter.completeWithError(e);
			}
		});
	}

	@Scheduled(fixedRate = HEARTBEAT_INTERVAL_MS)
	public void heartbeat() {
		emitterRepository.findAll().forEach((foodTruckId, byEmitter) -> byEmitter.forEach((emitterId, emitter) -> {
			try {
				send(emitter, "heartbeat", "\"" + System.currentTimeMillis() + "\"");
				redisTemplate.expire(connKey(foodTruckId, emitterId), CONN_TTL_SECONDS, TimeUnit.SECONDS);
			} catch (IOException | IllegalStateException e) {
				emitterRepository.remove(foodTruckId, emitterId);
				unregister(foodTruckId, emitterId);
				emitter.completeWithError(e);
			}
		}));
		refreshRegistryGauge();
	}

	private void refreshRegistryGauge() {
		int count = 0;
		try (Cursor<String> keys = redisTemplate.scan(ScanOptions.scanOptions().match(CONN_KEY_PREFIX + "*").count(500).build())) {
			while (keys.hasNext()) {
				keys.next();
				count++;
			}
			registryConnections.set(count);
		} catch (Exception e) {
			log.warn("Failed to count SSE registry", e);
		}
	}

	private void register(Long foodTruckId, String emitterId) {
		try {
			redisTemplate.opsForValue().set(connKey(foodTruckId, emitterId), instanceId, CONN_TTL_SECONDS, TimeUnit.SECONDS);
		} catch (Exception e) {
			log.warn("Failed to register SSE connection ft={}", foodTruckId, e);
		}
	}

	private void unregister(Long foodTruckId, String emitterId) {
		try {
			redisTemplate.delete(connKey(foodTruckId, emitterId));
		} catch (Exception e) {
			log.warn("Failed to unregister SSE connection ft={}", foodTruckId, e);
		}
	}

	static String connKey(Long foodTruckId, String emitterId) {
		return CONN_KEY_PREFIX + foodTruckId + ":" + emitterId;
	}

	private String toJson(Object data) throws JsonProcessingException {
		return objectMapper.writeValueAsString(data);
	}

	/** Records the SSE frame size Nginx actually reads ("event:..\ndata:..\n\n"), used to size proxy_buffer_size. */
	private void send(SseEmitter emitter, String name, String json) throws IOException {
		int frameBytes = ("event:" + name + "\ndata:" + json + "\n\n").getBytes(StandardCharsets.UTF_8).length;
		emitter.send(SseEmitter.event().name(name).data(json));
		DistributionSummary.builder("sse.event.frame.bytes").baseUnit("bytes").tag("event", name)
			.publishPercentiles(0.5, 0.99).register(meterRegistry).record(frameBytes);
	}

}
