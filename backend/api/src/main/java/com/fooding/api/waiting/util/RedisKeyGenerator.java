package com.fooding.api.waiting.util;

public class RedisKeyGenerator {

	public static String waitingLine(Long foodTruckId, Long memberId) {
		return "waiting_line:food_truck:" + foodTruckId + ":member:" + memberId;
	}

	public static String waitingNumber(Long foodTruckId) {
		return "waiting_number:food_truck:" + foodTruckId;
	}

}
