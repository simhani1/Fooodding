package com.fooding.api.waiting.repository;

import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {

	void save(Long foodTruckId, SseEmitter sseEmitter);

	void remove(Long foodTruckId);

	SseEmitter findByFoodTruckId(Long foodTruckId);

	Map<Long, SseEmitter> findAll();
	
}
