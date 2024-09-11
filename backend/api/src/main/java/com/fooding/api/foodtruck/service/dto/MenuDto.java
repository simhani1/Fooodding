package com.fooding.api.foodtruck.service.dto;

import lombok.Builder;

@Builder
public record MenuDto(
	String name,
	int price,
	String img,
	boolean onSale
) {
}