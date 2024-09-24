package com.fooding.api.foodtruck.service.impl;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.service.FoodTruckCommandService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
class FoodTruckCommandServiceImpl implements FoodTruckCommandService {

	private final FoodTruckRepository foodTruckRepository;

	@Override
	public FoodTruckDto getFoodTruckDetail(Long foodTruckId) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by ownerID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		return FoodTruckDto.builder()
			.foodTruckId(foodTruck.getId())
			.name(foodTruck.getInfo().getName())
			.introduction(foodTruck.getInfo().getIntroduction())
			.licenseNumber(foodTruck.getInfo().getLicenseNumber())
			.category(foodTruck.getInfo().getCategory().name())
			.menuList(
				foodTruck.getMenuList().stream()
					.filter(Menu::isOnSale)
					.map(menu -> MenuDto.builder()
						.menuId(menu.getId())
						.img(menu.getImg())
						.name(menu.getName())
						.price(menu.getPrice())
						.onSale(menu.isOnSale())
						.build())
					.collect(Collectors.toList())
			)
			.build();
	}

}
