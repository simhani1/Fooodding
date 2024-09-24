package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

public interface FoodTruckCommandService {

	FoodTruckDto getFoodTruckDetail(Long foodTruckId);

}
