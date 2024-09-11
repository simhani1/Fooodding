package com.fooding.api.foodtruck.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.MenuRepository;
import com.fooding.api.foodtruck.service.dto.MenuDto;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RegisterMenuServiceImpl implements RegisterMenuService {

	private final FoodTruckRepository foodTruckRepository;
	private final MenuRepository menuRepository;

	@Transactional
	@Override
	public void registerMenu(Long foodTruckId, MenuDto dto) {
		FoodTruck foodtruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		Menu menu = Menu.builder()
			.foodTruck(foodtruck)
			.name(dto.name())
			.price(dto.price())
			.img(dto.img())
			.build();
		menuRepository.save(menu);
	}

}
