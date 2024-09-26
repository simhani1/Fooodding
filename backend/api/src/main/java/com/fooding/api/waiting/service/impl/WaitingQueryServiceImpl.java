package com.fooding.api.waiting.service.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.waiting.service.WaitingQueryService;
import com.fooding.api.waiting.util.RedisKeyGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
class WaitingQueryServiceImpl implements WaitingQueryService {

	private final RedisTemplate<String, String> redisTemplate;
	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;

	@Override
	public void reserve(Long userId, Long foodTruckId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		String waitingLineKey = RedisKeyGenerator.waitingLine(foodTruckId, userId);
		long reservedAt = System.currentTimeMillis();
		String waitingLineNumber = getWaitingNumber(foodTruckId);
		redisTemplate.opsForZSet().add(waitingLineKey, waitingLineNumber, reservedAt);
	}

	private String getWaitingNumber(Long foodTruckId) {
		String waitingNumberKey = RedisKeyGenerator.waitingNumber(foodTruckId);
		Long waitingNumber = redisTemplate.opsForValue().increment(waitingNumberKey);
		if (waitingNumber == null || waitingNumber < 100) {
			redisTemplate.opsForValue().set(waitingNumberKey, "100");
			return "100";
		}
		if (waitingNumber > 999) {
			redisTemplate.opsForValue().set(waitingNumberKey, "1000");
			return "100";
		}
		return String.valueOf(waitingNumber.intValue());
	}

}
