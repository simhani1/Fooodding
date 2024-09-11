package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface RegisterFoodTruckService {

	void registerFoodTruck(Long ownerId, FoodTruckDto dto);

}
