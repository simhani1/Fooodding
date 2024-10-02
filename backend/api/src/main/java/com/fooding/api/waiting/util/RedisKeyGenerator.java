package com.fooding.api.waiting.util;

public class RedisKeyGenerator {

	public static String waitingLineByFoodTruckAndMember(Long foodTruckId, Long memberId) {
		return "waiting_line:food_truck:" + foodTruckId + ":member:" + memberId;
	}

	public static String waitingLineByFoodTruck(Long foodTruckId) {
		return "waiting_line:food_truck:" + foodTruckId;
	}

	public static String waitingNumber(Long foodTruckId) {
		return "waiting_number:food_truck:" + foodTruckId;
	}

	public static String orderLineByFoodTruckAndMember(Long foodTruckId, Long memberId) {
		return "order_line:food_truck:" + foodTruckId + ":member:" + memberId;
	}

}
