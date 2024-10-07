package com.fooding.api.waiting.service;

import java.util.List;

import com.fooding.api.waiting.service.dto.WaitingInfoDto;

public interface WaitingCommandService {

	List<WaitingInfoDto> getReservationList(Long ownerId, Long foodTruckId);

}
