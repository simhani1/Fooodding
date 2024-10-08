package com.fooding.api.foodtruck.service;

import java.util.List;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface FoodTruckCommandService {

	FoodTruckDto getFoodTruckDetailForUser(Long userId, Long foodTruckId);

	FoodTruckDto getFoodTruckDetailForOwner(Long ownerId);

	List<FoodTruckDto> getOpenedFoodTrucks(Double latitude, Double longitude, Long lastFoodTruckId, int size);

}
