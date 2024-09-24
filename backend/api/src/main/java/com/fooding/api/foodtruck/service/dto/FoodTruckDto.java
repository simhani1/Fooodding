package com.fooding.api.foodtruck.service.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record FoodTruckDto(
	Long foodTruckId,
	String licenseNumber,
	String name,
	String introduction,
	String category,
	List<MenuDto> menuList
) {
}