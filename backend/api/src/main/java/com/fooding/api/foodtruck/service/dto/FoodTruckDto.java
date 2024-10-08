package com.fooding.api.foodtruck.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;

import lombok.Builder;

@Builder
public record FoodTruckDto(
	Long foodTruckId,
	String licenseNumber,
	String name,
	String introduction,
	String category,
	String mainMenuImg,
	String menus,
	List<MenuDto> menuList,
	@JsonProperty("isReserved")
	boolean reserved,
	WaitingInfoDto waitingInfo,
	double latitude,
	double longitude,
	@JsonProperty("isOpened")
	boolean opened
) {
}