package com.fooding.api.foodtruck.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.exception.NoMenuException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.MenuRepository;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class MenuQueryServiceImpl implements MenuQueryService {

	private final FoodTruckRepository foodTruckRepository;
	private final MenuRepository menuRepository;

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

	@Override
	public void updateMenu(Long menuId, MenuDto dto){
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));

		//image가 null이면 기존 이미지 경로 활용
		String imageUrl = dto.img() != null ? dto.img() : menu.getImg();

		menu.update(dto.name(), dto.price(), imageUrl);
	}

	@Override
	public void deleteMenu(Long menuId) {
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));
		menuRepository.deleteById(menuId);
	}
}
