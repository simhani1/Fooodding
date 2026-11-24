package com.fooding.api.waiting.repository.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.waiting.repository.EmitterRepository;

@Repository
public class EmitterRepositoryImpl implements EmitterRepository {

	private final Map<Long, Map<String, SseEmitter>> emitters = new ConcurrentHashMap<>();

	@Override
	public void save(Long foodTruckId, String emitterId, SseEmitter emitter) {
		emitters.computeIfAbsent(foodTruckId, id -> new ConcurrentHashMap<>()).put(emitterId, emitter);
	}

	@Override
	public void remove(Long foodTruckId, String emitterId) {
		emitters.computeIfPresent(foodTruckId, (id, byEmitter) -> {
			byEmitter.remove(emitterId);
			return byEmitter.isEmpty() ? null : byEmitter;
		});
	}

	@Override
	public Map<String, SseEmitter> findByFoodTruckId(Long foodTruckId) {
		return emitters.getOrDefault(foodTruckId, Map.of());
	}

	@Override
	public Map<Long, Map<String, SseEmitter>> findAll() {
		return emitters;
	}

	@Override
	public int count() {
		return emitters.values().stream().mapToInt(Map::size).sum();
	}

}
