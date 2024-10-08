package com.fooding.api.notification.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.repository.EmitterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
class NotificationServiceImpl implements NotificationService {

	private final EmitterRepository emitterRepository;
	private final long DEFAULT_TIME_OUT = Long.MAX_VALUE;
	private final long HEARTBEAT_INTERVAL = 10000L;

	@Override
	public <T> SseEmitter send(Long foodTruckId, String name, T obj) {
		try {
			SseEmitter emitter = emitterRepository.findByFoodTruckId(foodTruckId);
			if (emitter == null) {
				emitter = save(foodTruckId);
			}
			sendNotification(emitter, name, obj);
			return emitter;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private SseEmitter save(Long foodTruckId) {
		SseEmitter emitter = new SseEmitter(DEFAULT_TIME_OUT);
		emitter.onCompletion(() -> {
			log.info("SSE 연결이 정상 종료되었습니다.");
			emitterRepository.remove(foodTruckId);
		});
		emitter.onTimeout(() -> {
			log.info("SSE 연결이 타임아웃되었습니다.");
			emitter.complete();
		});
		emitter.onError((e) -> {
			log.info("SSE 연결중 오류가 발생했습니다.");
			emitter.complete();
		});
		emitterRepository.save(foodTruckId, emitter);
		return emitter;
	}

	@Scheduled(fixedRate = HEARTBEAT_INTERVAL)
	private void sendHeartbeat() {
		Map<Long, SseEmitter> emitters = emitterRepository.findAll();
		for (Map.Entry<Long, SseEmitter> entry : emitters.entrySet()) {
			Long foodTruckId = entry.getKey();
			SseEmitter emitter = entry.getValue();
			try {
				sendNotification(emitter, "heartbeat",
					"Heartbeat for food truck " + foodTruckId + " at " + System.currentTimeMillis());
			} catch (IOException e) {
				emitter.completeWithError(e);
			}
		}
	}

	private <T> void sendNotification(SseEmitter emitter, String name, T data) throws IOException {
		emitter.send(SseEmitter.event()
			.name(name)
			.data(data));
	}

}
