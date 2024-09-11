package com.fooding.api.foodtruck.controller.request;

import lombok.Builder;

@Builder
public record FoodTruckReq(
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