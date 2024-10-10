package com.fooding.api.foodtruck.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodCategory;
import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.FoodTruckInfo;
import com.fooding.api.foodtruck.domain.commerce.CommerceInfo;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.service.FoodTruckQueryService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.foodtruck.util.PointFactory;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
class FoodTruckQueryServiceImpl implements FoodTruckQueryService {

	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;

	@Override
	public FoodTruckDto registerFoodTruck(Long ownerId, FoodTruckDto dto) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepository.save(FoodTruck.builder()
			.member(owner)
			.info(FoodTruckInfo.builder()
				.name(dto.name())
				.category(FoodCategory.valueOf(dto.category()))
				.introduction(dto.introduction())
				.licenseNumber(dto.licenseNumber())
				.build())
			.commerceInfo(CommerceInfo.ofNew(PointFactory.create(0, 0)))
			.build());
		return FoodTruckDto.builder()
			.foodTruckId(foodTruck.getId())
			.build();
	}

	@Override
	public void updateFoodTruck(Long foodTruckId, FoodTruckDto dto) {
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by foodTruckID: " + foodTruckId));
		foodTruck.updateInfo(FoodTruckInfo.builder()
			.name(dto.name())
			.licenseNumber(dto.licenseNumber())
			.introduction(dto.introduction())
			.category(FoodCategory.valueOf(dto.category()))
			.build());
	}

}
