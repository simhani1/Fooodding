package com.fooding.api.foodtruck.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.BankInfo;
import com.fooding.api.foodtruck.domain.FoodCategory;
import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.FoodTruckInfo;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.owner.domain.Owner;
import com.fooding.api.owner.exception.NoOwnerException;
import com.fooding.api.owner.repository.OwnerRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RegisterFoodTruckServiceImpl implements RegisterFoodTruckService {

	private final OwnerRepository ownerRepository;
	private final FoodTruckRepository foodTruckRepository;

	@Transactional
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
				.phoneNumber(dto.phoneNumber())
				.snsLink(dto.snsLink())
				.build())
			.bankInfo(BankInfo.builder()
				.bank(dto.bank())
				.accountName(dto.accountName())
				.accountNumber(dto.accountNumber())
				.build())
			.build();
		foodTruckRepository.save(foodTruck);
	}

}
