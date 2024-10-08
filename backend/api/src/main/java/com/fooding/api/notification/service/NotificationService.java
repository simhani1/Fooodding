package com.fooding.api.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

	<T> SseEmitter send(Long foodTruckId, String name, T obj);

}
