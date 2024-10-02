package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface FoodTruckCommandService {

	FoodTruckDto getFoodTruckDetailForUser(Long memberId, Long foodTruckId);

	FoodTruckDto getFoodTruckDetailForOwner(Long ownerId);

}
