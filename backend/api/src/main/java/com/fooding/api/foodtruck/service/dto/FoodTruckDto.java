package com.fooding.api.foodtruck.service.dto;

import lombok.Builder;

@Builder
public record FoodTruckDto(
	String licenseNumber,
	String name,
	String introduction,
	String category
) {
}