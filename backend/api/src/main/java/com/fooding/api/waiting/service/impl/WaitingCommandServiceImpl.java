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
		String waitingNumber = waitingNumber = getWaitingNumber(
			RedisKeyGenerator.waitingLineByFoodTruckAndMember(foodTruckId, userId));
		if (waitingNumber != null) {
			Long rank = getRank(RedisKeyGenerator.waitingLineByFoodTruckAndMember(foodTruckId, userId), waitingNumber);
			return WaitingInfoDto.builder()
				.number(Integer.parseInt(waitingNumber))
				.rank(rank)
				.cancelable(true)
				.build();
		}
		// orderLine에 예약 내역이 있는 경우
		waitingNumber = getWaitingNumber(RedisKeyGenerator.orderLineByFoodTruckAndMember(foodTruckId, userId));
		if (waitingNumber != null) {
			return WaitingInfoDto.builder()
				.number(Integer.parseInt(waitingNumber))
				.changedAt(null)  // TODO: 사장님이 orderLine으로 변경한 시점
				.cancelable(false)
				.build();
		}
		throw new NoWaitingInfoException("No waiting info");
	}

	private Long getRank(String key, String waitingNumber) {
		return redisTemplate.opsForZSet().rank(key, waitingNumber);
	}

	private String getWaitingNumber(String key) {
		return redisTemplate.opsForZSet().range(key, 0, -1).stream().findFirst()
			.orElseThrow(() -> new NoWaitingInfoException("No waiting info"));
	}

	private LocalDateTime toLocalDateTime(Instant reservedAt, ZoneId zoneId) {
		return LocalDateTime.ofInstant(reservedAt, zoneId);
	}

}
