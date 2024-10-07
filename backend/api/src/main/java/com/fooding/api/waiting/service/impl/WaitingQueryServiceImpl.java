package com.fooding.api.waiting.service.impl;

import java.time.ZoneOffset;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.waiting.domain.Waiting;
import com.fooding.api.waiting.exception.CannotCancelWaitingException;
import com.fooding.api.waiting.exception.NoWaitingInfoException;
import com.fooding.api.waiting.repository.EmitterRepository;
import com.fooding.api.waiting.repository.WaitingRepository;
import com.fooding.api.waiting.service.WaitingQueryService;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
class WaitingQueryServiceImpl implements WaitingQueryService {

	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;
	private final WaitingRepository waitingRepository;
	private final EmitterRepository emitterRepository;

	@Override
	public void reserve(Long userId, Long foodTruckId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		int waitingNumber = foodTruck.nextWaitingNumber();
		Waiting waiting = Waiting.builder()
			.member(user)
			.foodTruck(foodTruck)
			.number(waitingNumber)
			.build();
		waitingRepository.save(waiting);
	}

	@Override
	public void cancel(Long userId, Long waitingId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		Waiting waiting = waitingRepository.findByIdAndMember(waitingId, user)
			.orElseThrow(() -> new NoWaitingInfoException("Waiting not found with ID: " + waitingId));
		if (!waiting.getCancellable()) {
			throw new CannotCancelWaitingException("Cannot cancel waiting");
		}
		waitingRepository.deleteById(waitingId);
	}

	@Override
	public WaitingInfoDto changeToOrderLine(Long ownerId, Long waitingId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		Waiting waiting = waitingRepository.findById(waitingId)
			.orElseThrow(() -> new NoWaitingInfoException("Waiting not found with ID: " + waitingId));
		waiting.changeToOrderLine();
		return WaitingInfoDto.builder()
			.waitingId(waiting.getId())
			.changedAt(waiting.getChangedAt().toInstant(ZoneOffset.UTC).toEpochMilli())
			.cancelable(waiting.getCancellable())
			.number(waiting.getNumber())
			.build();
	}

}
