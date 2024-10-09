package com.fooding.api.waiting.service;

import com.fooding.api.waiting.service.dto.WaitingInfoDto;

public interface WaitingQueryService {

	WaitingInfoDto reserve(Long userId, Long foodTruckId);

	void cancel(Long userId, Long waitingId);

	WaitingInfoDto changeToOrderLine(Long ownerId, Long waitingId);

	void callUesr(Long ownerId, Long waitingId, boolean completed);

}
