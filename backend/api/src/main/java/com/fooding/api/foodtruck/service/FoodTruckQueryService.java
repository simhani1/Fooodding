package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface FoodTruckQueryService {

	void registerFoodTruck(Long ownerId, FoodTruckDto dto);

	void updateFoodTruck(Long ownerId, FoodTruckDto dto);

}
