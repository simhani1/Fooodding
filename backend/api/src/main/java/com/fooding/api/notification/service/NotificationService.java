package com.fooding.api.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

	/** Opens a new SSE connection on this instance and sends the initial snapshot as "connected". */
	SseEmitter subscribe(Long foodTruckId, Object snapshot);

	/** Broadcasts an event to every instance via Redis Pub/Sub. Never throws: delivery failure must not fail the caller. */
	void publish(Long foodTruckId, String name, Object data);

}
