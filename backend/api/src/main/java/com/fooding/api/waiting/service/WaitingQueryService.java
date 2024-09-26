package com.fooding.api.waiting.service;

public interface WaitingQueryService {

	void reserve(Long userId, Long foodTruckId);

}
