package com.fooding.api.foodtruck.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record MenuDto(
	Long menuId,
	String name,
	int price,
	String img,
	@JsonProperty("isOnSale")
	boolean onSale
) {
}