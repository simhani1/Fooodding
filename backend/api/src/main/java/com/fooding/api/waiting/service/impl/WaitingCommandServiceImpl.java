package com.fooding.api.waiting.service.impl;

import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.domain.Waiting;
import com.fooding.api.waiting.repository.WaitingRepository;
import com.fooding.api.waiting.service.WaitingCommandService;
import com.fooding.api.waiting.service.dto.UserWaitingInfoDto;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
class WaitingCommandServiceImpl implements WaitingCommandService {

	private final NotificationService notificationService;
	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;
	private final WaitingRepository waitingRepository;

	@Override
	public List<WaitingInfoDto> getReservationList(Long ownerId, Long foodTruckId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		List<Waiting> waitingList = waitingRepository.findByFoodTruck(foodTruck);
		return waitingList.stream()
			.map(waiting -> WaitingInfoDto.builder()
				.waitingId(waiting.getId())
				.changedAt(waiting.getChangedAt().toInstant(ZoneOffset.UTC).toEpochMilli())
				.cancelable(waiting.isCancellable())
				.number(waiting.getNumber())
				.userName(waiting.getMember().getNickname())
				.build())
			.collect(Collectors.toList());
	}

	@Override
	public List<UserWaitingInfoDto> getUserReservationList(Long userId) {
		Member user  =memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("User not found with ID: " + userId));
		List<Waiting> waitingList = waitingRepository.findByMember(user);
		return waitingList.stream()
			.map(waiting -> UserWaitingInfoDto.builder()
				.waitingId(waiting.getId())
				.number(waiting.getNumber())
				.foodTruckName(waiting.getFoodTruck().getInfo().getName())
				.build())
			.collect(Collectors.toList());
	}

}
