package com.fooding.api.foodtruck.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodCategory;
import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.FoodTruckInfo;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.owner.domain.Owner;
import com.fooding.api.owner.exception.NoOwnerException;
import com.fooding.api.owner.repository.OwnerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
class FoodTruckQueryServiceImpl implements FoodTruckQueryService {

	private final OwnerRepository ownerRepository;
	private final FoodTruckRepository foodTruckRepository;
	private final FoodTruckRepositoryCustom foodTruckRepositoryCustom;

	@Override
	public void registerFoodTruck(Long ownerId, FoodTruckDto dto) {
		Owner owner = ownerRepository.findById(ownerId)
			.orElseThrow(() -> new NoOwnerException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = FoodTruck.builder()
			.owner(owner)
			.info(FoodTruckInfo.builder()
				.name(dto.name())
				.category(FoodCategory.valueOf(dto.category()))
				.introduction(dto.introduction())
				.licenseNumber(dto.licenseNumber())
				.build())
			.build();
		foodTruckRepository.save(foodTruck);
	}

	@Override
	public void updateFoodTruck(Long ownerId, FoodTruckDto dto) {
		Owner owner = ownerRepository.findById(ownerId)
			.orElseThrow(() -> new NoOwnerException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepositoryCustom.findByOwner(owner);
		foodTruck.updateInfo(FoodTruckInfo.builder()
			.name(dto.name())
			.licenseNumber(dto.licenseNumber())
			.introduction(dto.introduction())
			.category(FoodCategory.valueOf(dto.category()))
			.build());
	}

}
