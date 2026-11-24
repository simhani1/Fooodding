package com.fooding.api.waiting.repository;

import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * SSE connections held by THIS instance only. Cluster-wide view lives in Redis (sse:conn:*).
 * One food truck may have several connections (owner tablet + phone), keyed by emitterId.
 */
public interface EmitterRepository {

	void save(Long foodTruckId, String emitterId, SseEmitter sseEmitter);

	void remove(Long foodTruckId, String emitterId);

	Map<String, SseEmitter> findByFoodTruckId(Long foodTruckId);

	Map<Long, Map<String, SseEmitter>> findAll();

	int count();

}
