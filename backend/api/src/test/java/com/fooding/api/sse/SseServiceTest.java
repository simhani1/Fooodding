package com.fooding.api.sse;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.redis.connection.DefaultMessage;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooding.api.waiting.repository.impl.EmitterRepositoryImpl;

import io.micrometer.core.instrument.simple.SimpleMeterRegistry;

class SseServiceTest {

	StringRedisTemplate redis = mock(StringRedisTemplate.class);
	@SuppressWarnings("unchecked")
	ValueOperations<String, String> values = mock(ValueOperations.class);
	EmitterRepositoryImpl repo = new EmitterRepositoryImpl();
	ObjectMapper mapper = new ObjectMapper();
	SimpleMeterRegistry meters = new SimpleMeterRegistry();
	SseService service;

	@BeforeEach
	void setUp() {
		when(redis.opsForValue()).thenReturn(values);
		service = new SseService(repo, redis, mapper, meters, "api-1");
	}

	/** Captures sent event names; optionally fails like a broken socket. */
	static class RecordingEmitter extends SseEmitter {
		final List<String> sent = new ArrayList<>();
		final boolean broken;

		RecordingEmitter(boolean broken) {
			this.broken = broken;
		}

		@Override
		public void send(SseEventBuilder builder) throws IOException {
			if (broken) {
				throw new IOException("Broken pipe");
			}
			StringBuilder frame = new StringBuilder();
			builder.build().forEach(part -> frame.append(part.getData()));
			sent.add(frame.toString());
		}
	}

	private DefaultMessage message(long ftId, String name, String origin) throws Exception {
		String json = mapper.writeValueAsString(
			new SseService.SseMessage(ftId, name, "{\"waitingId\":1}", origin, System.currentTimeMillis()));
		return new DefaultMessage(SseService.CHANNEL.getBytes(), json.getBytes(StandardCharsets.UTF_8));
	}

	@Test
	void subscribe_registersEveryConnectionLocallyAndInRedisWithTtl() {
		service.subscribe(7L, List.of());
		service.subscribe(7L, List.of());

		assertThat(repo.findByFoodTruckId(7L)).hasSize(2);
		verify(values, times(2)).set(startsWith("sse:conn:7:"), eq("api-1"), eq(30L), eq(TimeUnit.SECONDS));
	}

	@Test
	void publish_goesToRedisChannelNotToLocalEmitters() {
		RecordingEmitter local = new RecordingEmitter(false);
		repo.save(7L, "e1", local);

		service.publish(7L, "reserved", new Object[] {});

		verify(redis).convertAndSend(eq(SseService.CHANNEL), contains("\"origin\":\"api-1\""));
		assertThat(local.sent).isEmpty();
	}

	@Test
	void publish_swallowsRedisFailureSoTheCallerStillSucceeds() {
		doThrow(new RuntimeException("redis down")).when(redis).convertAndSend(anyString(), anyString());

		assertThatCode(() -> service.publish(7L, "reserved", "x")).doesNotThrowAnyException();
		assertThat(meters.counter("sse.events.publish.failed").count()).isEqualTo(1);
	}

	@Test
	void onMessage_deliversToAllLocalConnectionsOfThatTruckOnly() throws Exception {
		RecordingEmitter tablet = new RecordingEmitter(false);
		RecordingEmitter phone = new RecordingEmitter(false);
		RecordingEmitter otherTruck = new RecordingEmitter(false);
		repo.save(7L, "tablet", tablet);
		repo.save(7L, "phone", phone);
		repo.save(9L, "x", otherTruck);

		service.onMessage(message(7L, "reserved", "api-2"), null);

		assertThat(tablet.sent).hasSize(1).first().asString().contains("event:reserved");
		assertThat(phone.sent).hasSize(1);
		assertThat(otherTruck.sent).isEmpty();
		assertThat(meters.counter("sse.events.delivered", "event", "reserved", "route", "cross_instance").count())
			.isEqualTo(2);
	}

	@Test
	void onMessage_dropsBrokenConnectionAndKeepsDeliveringToTheRest() throws Exception {
		RecordingEmitter dead = new RecordingEmitter(true);
		RecordingEmitter alive = new RecordingEmitter(false);
		repo.save(7L, "dead", dead);
		repo.save(7L, "alive", alive);

		service.onMessage(message(7L, "canceled", "api-1"), null);

		assertThat(alive.sent).hasSize(1);
		assertThat(repo.findByFoodTruckId(7L)).containsOnlyKeys("alive");
		verify(redis).delete("sse:conn:7:dead");
	}

	@Test
	void onMessage_ignoresTrucksWithNoLocalConnection() throws Exception {
		assertThatCode(() -> service.onMessage(message(42L, "reserved", "api-2"), null)).doesNotThrowAnyException();
		assertThat(repo.count()).isZero();
	}
}
