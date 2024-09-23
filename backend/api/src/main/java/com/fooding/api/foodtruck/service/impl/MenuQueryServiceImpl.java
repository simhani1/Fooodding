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
	public void registerMenu(MenuDto dto) {
		// TODO: owenr id로 푸드트럭을 조회해야 한다.
		FoodTruck foodtruck = foodTruckRepository.findById(null)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + null));
		Menu menu = Menu.builder()
			.foodTruck(foodtruck)
			.name(dto.name())
			.price(dto.price())
			.img(dto.img())
			.build();
		menuRepository.save(menu);
	}

	@Override
	public void updateMenu(Long menuId, MenuDto dto) {
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
