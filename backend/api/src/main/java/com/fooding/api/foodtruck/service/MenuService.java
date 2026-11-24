package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.exception.NoMenuException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.MenuRepository;
import com.fooding.api.foodtruck.repository.custom.MenuRepositoryCustom;
import com.fooding.api.foodtruck.service.dto.MenuDto;
import com.fooding.api.member.exception.NoMemberException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MenuService {

	private final FoodTruckRepository foodTruckRepository;
	private final MenuRepositoryCustom menuRepositoryCustom;
	private final MenuRepository menuRepository;

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

	@Transactional
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

	@Transactional
	public void updateMenu(Long foodTruckId, Long menuId, MenuDto dto) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found for Member with ID: " + foodTruckId));
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));
		menu.update(dto.name(), dto.price(), dto.img());
	}

	@Transactional
	public void deleteMenu(Long menuId) {
		Menu menu = menuRepository.findById(menuId)
			.orElseThrow(() -> new NoMenuException("Menu not found with ID: " + menuId));
		menuRepository.deleteById(menuId);
	}

}
