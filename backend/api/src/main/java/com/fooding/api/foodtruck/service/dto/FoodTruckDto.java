package com.fooding.api.foodtruck.service.dto;

import lombok.Builder;

@Builder
public record FoodTruckDto(
	String licenseNumber,
	String name,
	String introduction,
	String category,
	String phoneNumber,
	String snsLink,
	String bank,
	String accountName,
	String accountNumber
) {
}