package com.fooding.api.foodtruck.service.impl;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyOpenedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.foodtruck.service.FoodTruckCommandService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.foodtruck.service.dto.MenuDto;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.waiting.repository.custom.WaitingRepositoryCustom;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
class FoodTruckCommandServiceImpl implements FoodTruckCommandService {

	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;
	private final FoodTruckRepositoryCustom foodTruckRepositoryCustom;
	private final WaitingRepositoryCustom waitingRepositoryCustom;

	@Override
	public FoodTruckDto getFoodTruckDetailForUser(Long userId, Long foodTruckId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by foodTruckID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		WaitingInfoDto waitingInfoDto = waitingRepositoryCustom.findWaitingInfoByFoodTruck(foodTruck, user);
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
			.reserved(waitingInfoDto != null)
			.waitingInfoDto(waitingInfoDto)
			.build();
	}

	@Override
	public FoodTruckDto getFoodTruckDetailForOwner(Long ownerId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepositoryCustom.findByOwner(owner)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by ownerID: " + ownerId));
		if (foodTruck.isOpened()) {
			throw new FoodTruckAlreadyOpenedException("FoodTruck is already opened");
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
