package com.fooding.api.waiting.service.dto;

import lombok.Builder;

@Builder
public record UserWaitingInfoDto(
	Long waitingId,
	Integer number,
	Long foodTruckId,
	String foodTruckName
) {
}
