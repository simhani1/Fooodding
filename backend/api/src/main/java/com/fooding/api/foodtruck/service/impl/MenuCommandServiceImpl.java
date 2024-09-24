package com.fooding.api.foodtruck.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.custom.MenuRepositoryCustom;
import com.fooding.api.foodtruck.service.MenuCommandService;
import com.fooding.api.foodtruck.service.dto.MenuDto;
import com.fooding.api.member.exception.NoMemberException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
class MenuCommandServiceImpl implements MenuCommandService {

	private final FoodTruckRepository foodTruckRepository;
	private final MenuRepositoryCustom menuRepositoryCustom;

	@Override
	public List<MenuDto> getMenuListForOwner(Long foodTruckId) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoMemberException("FoodTruck not found with ID: " + foodTruckId));
		List<Menu> menuList = menuRepositoryCustom.findMenuListJoinWithFoodTruck(foodTruck);
		return menuList.stream()
			.map(menu ->
				MenuDto.builder()
					.menuId(menu.getId())
					.name(menu.getName())
					.price(menu.getPrice())
					.img(menu.getImg())
					.onSale(menu.isOnSale())
					.build()
			)
			.collect(Collectors.toList());
	}

}
