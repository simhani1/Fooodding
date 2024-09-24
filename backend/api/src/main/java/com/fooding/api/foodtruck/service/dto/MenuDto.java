package com.fooding.api.foodtruck.service.dto;

import lombok.Builder;

@Builder
public record MenuDto(
	Long menuId,
	String name,
	int price,
	String img,
	boolean onSale
) {
}