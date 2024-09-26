package com.fooding.api.foodtruck.service.dto;

import lombok.Builder;

@Builder
public record CommerceDto(
	Long foodTruckId,
	Double latitude,
	Double longitude
) {
}
