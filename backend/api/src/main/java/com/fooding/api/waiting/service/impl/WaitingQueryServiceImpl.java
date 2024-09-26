package com.fooding.api.waiting.service.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fooding.api.waiting.service.WaitingQueryService;
import com.fooding.api.waiting.util.RedisKeyGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
class WaitingQueryServiceImpl implements WaitingQueryService {

	private final RedisTemplate<String, String> redisTemplate;

	@Override
	public void reserve(Long memberId, Long foodTruckId) {
		String waitingLineKey = RedisKeyGenerator.waitingLine(foodTruckId, memberId);
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
