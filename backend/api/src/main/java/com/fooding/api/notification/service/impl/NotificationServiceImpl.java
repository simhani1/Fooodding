package com.fooding.api.notification.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.repository.EmitterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
class NotificationServiceImpl implements NotificationService {

	private final EmitterRepository emitterRepository;
	private final Long DEFAULT_TIME_OUT = 5000L;

	@Override
	public void save(Long foodTruckId) {
		SseEmitter emitter = new SseEmitter(DEFAULT_TIME_OUT);
		emitter.onCompletion(() -> {
			log.info("SSE 연결이 정상 종료되었습니다.");
			emitterRepository.remove(foodTruckId);
		});
		emitter.onTimeout(() -> {
			log.info("SSE 연결이 타임아웃되었습니다.");
			emitter.complete();
			emitterRepository.remove(foodTruckId);
		});
		emitterRepository.save(foodTruckId, emitter);
	}

	@Override
	public <T> SseEmitter send(Long foodTruckId, String name, T obj) {
		SseEmitter emitter = emitterRepository.findByFoodTruckId(foodTruckId);
		sendNotification(emitter, name, obj);
		return emitter;
	}

	private <T> void sendNotification(SseEmitter emitter, String name, T data) {
		try {
			emitter.send(SseEmitter.event()
				.name(name)
				.data(data));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
