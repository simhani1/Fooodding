package com.fooding.api.waiting.service.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.waiting.exception.NoWaitingInfoException;
import com.fooding.api.waiting.service.WaitingCommandService;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;
import com.fooding.api.waiting.util.RedisKeyGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
class WaitingCommandServiceImpl implements WaitingCommandService {

	private final RedisTemplate<String, String> redisTemplate;
	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;

	@Override
	public WaitingInfoDto getWaitingInfo(Long userId, Long foodTruckId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		// waitingLine에 예약 내역이 있는 경우
		String waitingNumber = getWaitingNumber(RedisKeyGenerator.waitingLineByFoodTruckAndMember(foodTruckId, userId));
		if (waitingNumber != null) {
			LocalDateTime reservedAt = toLocalDateTime(getReservedAt(userId, foodTruckId), ZoneId.systemDefault());
			Long rank = getRank(RedisKeyGenerator.waitingLineByFoodTruck(foodTruckId), userId);
			return WaitingInfoDto.builder()
				.number(Integer.parseInt(waitingNumber))
				.rank(rank)
				.reservedAt(reservedAt)
				.cancelable(true)
				.build();
		}
		// orderLine에 예약 내역이 있는 경우
		waitingNumber = getWaitingNumber(RedisKeyGenerator.orderLineByFoodTruckAndMember(foodTruckId, userId));
		if (waitingNumber != null) {
			LocalDateTime reservedAt = toLocalDateTime(getReservedAt(userId, foodTruckId), ZoneId.systemDefault());
			return WaitingInfoDto.builder()
				.number(Integer.parseInt(waitingNumber))
				.reservedAt(reservedAt)
				.cancelable(false)
				.build();
		}
		throw new NoWaitingInfoException("No waiting info");
	}

	private Long getRank(String key, Long userId) {
		return redisTemplate.opsForZSet().rank(key, userId);
	}

	private Instant getReservedAt(Long userId, Long foodTruckId) {
		return Instant.ofEpochMilli(redisTemplate.opsForZSet()
			.score(RedisKeyGenerator.waitingLineByFoodTruck(foodTruckId), userId).longValue());
	}

	private String getWaitingNumber(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	private LocalDateTime toLocalDateTime(Instant reservedAt, ZoneId zoneId) {
		return LocalDateTime.ofInstant(reservedAt, zoneId);
	}

}
