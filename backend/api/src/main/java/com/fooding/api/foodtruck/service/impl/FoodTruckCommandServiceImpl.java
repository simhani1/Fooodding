package com.fooding.api.foodtruck.service.impl;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.foodtruck.service.FoodTruckCommandService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.foodtruck.service.dto.MenuDto;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.domain.MemberRole;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;

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

	@Override
	public FoodTruckDto getFoodTruckDetailForUser(Long memberId, Long foodTruckId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + memberId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by foodTruckID: " + foodTruckId));
		if (member.getRole().equals(MemberRole.USER) && foodTruck.isClosed()) {
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

	@Override
	public FoodTruckDto getFoodTruckDetailForOwner(Long ownerId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepositoryCustom.findByOwner(owner)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by ownerID: " + ownerId));
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
