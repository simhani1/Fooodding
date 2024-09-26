package com.fooding.api.foodtruck.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyOpenedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.service.CommerceQueryService;
import com.fooding.api.foodtruck.service.dto.CommerceDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
class CommerceQueryServiceImpl implements CommerceQueryService {

	private final FoodTruckRepository foodTruckRepository;

	@Override
	public void openFoodTruck(Long foodTruckId, CommerceDto dto, List<Long> unsoldMenuId) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isOpened()) {
			throw new FoodTruckAlreadyOpenedException("FoodTruck is already opened");
		}
		foodTruck.open(dto.latitude(), dto.longitude(), unsoldMenuId);
	}

	@Override
	public void closeFoodTruck(Long foodTruckId) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		foodTruck.close();
	}

}
