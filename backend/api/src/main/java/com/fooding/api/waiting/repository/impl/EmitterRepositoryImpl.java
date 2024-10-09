package com.fooding.api.waiting.repository.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.waiting.repository.EmitterRepository;

@Repository
public class EmitterRepositoryImpl implements EmitterRepository {

	private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

	@Override
	public void save(Long foodTruckId, SseEmitter emitter) {
		emitters.put(foodTruckId, emitter);
	}

	@Override
	public void remove(Long foodTruckId) {
		emitters.remove(foodTruckId);
	}

	@Override
	public SseEmitter findByFoodTruckId(Long foodTruckId) {
		return emitters.get(foodTruckId);
	}

	@Override
	public Map<Long, SseEmitter> findAll() {
		return emitters;
	}

}
