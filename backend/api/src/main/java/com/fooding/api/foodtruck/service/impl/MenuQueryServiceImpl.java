package com.fooding.api.foodtruck.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.exception.NoMenuException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.MenuRepository;
import com.fooding.api.foodtruck.service.MenuQueryService;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
class MenuQueryServiceImpl implements MenuQueryService {

	private final FoodTruckRepository foodTruckRepository;
	private final MenuRepository menuRepository;

	@Override
	public void registerMenu(Long foodTruckId, MenuDto dto) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found for Member with ID: " + foodTruckId));
		Menu menu = Menu.builder()
			.foodTruck(foodTruck)
			.name(dto.name())
			.price(dto.price())
			.img(dto.img())
			.build();
		menuRepository.save(menu);
	}

	@Override
	public void updateMenu(Long foodTruckId, Long menuId, MenuDto dto) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found for Member with ID: " + foodTruckId));
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));
		menu.update(dto.name(), dto.price(), dto.img());
	}

	@Override
	public void deleteMenu(Long menuId) {
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));
		menuRepository.deleteById(menuId);
	}
}
