package com.fooding.api.waiting.service;

import com.fooding.api.waiting.service.dto.WaitingInfoDto;

public interface WaitingCommandService {

	WaitingInfoDto getWaitingInfo(Long userId, Long foodTruckId);

}
