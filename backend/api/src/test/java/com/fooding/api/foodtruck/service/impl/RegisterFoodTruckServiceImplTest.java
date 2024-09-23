package com.fooding.api.foodtruck.service.impl;

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
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.domain.Provider;
import com.fooding.api.member.repository.MemberRepository;

@ExtendWith(MockitoExtension.class)
class RegisterFoodTruckServiceImplTest {

	@InjectMocks
	private FoodTruckQueryServiceImpl foodTruckQueryServiceImpl;

	@Mock
	private FoodTruckRepository foodTruckRepository;

	@Mock
	private MemberRepository memberRepository;

	@DisplayName("푸드트럭 등록에 성공한다.")
	@Test
	void registerFoodTruckSuccess() {
		// given
		Long memberId = 1L;

		Member member = Member.builder()
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
		when(memberRepository.findById(anyLong())).thenReturn(Optional.of(member));
		when(foodTruckRepository.save(any(FoodTruck.class))).thenReturn(any(FoodTruck.class));

		// then
		assertDoesNotThrow(() -> foodTruckQueryServiceImpl.registerFoodTruck(memberId, dto));
		verify(foodTruckRepository, times(1)).save(any(FoodTruck.class));
	}

}