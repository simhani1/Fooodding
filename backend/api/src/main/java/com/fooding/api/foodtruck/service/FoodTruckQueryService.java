package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface FoodTruckQueryService {

	void registerFoodTruck(Long memberId, FoodTruckDto dto);

	void updateFoodTruck(Long foodTruckId, FoodTruckDto dto);

}