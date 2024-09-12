package com.fooding.api.foodtruck.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;
import com.fooding.api.owner.domain.Owner;
import com.fooding.api.owner.domain.Provider;
import com.fooding.api.owner.repository.OwnerRepository;

@ExtendWith(MockitoExtension.class)
class RegisterFoodTruckServiceImplTest {

	@InjectMocks
	private FoodTruckQueryServiceImpl foodTruckQueryServiceImpl;

	@Mock
	private FoodTruckRepository foodTruckRepository;

	@Mock
	private OwnerRepository ownerRepository;

	@DisplayName("푸드트럭 등록에 성공한다.")
	@Test
	void registerFoodTruckSuccess() {
		// given
		Long ownerId = 1L;

		Owner owner = Owner.builder()
			.ages("20-30")
			.gender("MALE")
			.nickname("nickname")
			.provider(Provider.NAVER)
			.build();

		FoodTruckDto dto = FoodTruckDto.builder()
			.name("name")
			.licenseNumber("111111111")
			.introduction("introduction")
			.category("KOREAN")
			.build();

		// when
		when(ownerRepository.findById(anyLong())).thenReturn(Optional.of(owner));
		when(foodTruckRepository.save(any(FoodTruck.class))).thenReturn(any(FoodTruck.class));

		// then
		assertDoesNotThrow(() -> foodTruckQueryServiceImpl.registerFoodTruck(ownerId, dto));
		verify(foodTruckRepository, times(1)).save(any(FoodTruck.class));
	}

}