package com.fooding.api.foodtruck.exception;

public class FoodTruckAlreadyOpenedException extends RuntimeException {

	public FoodTruckAlreadyOpenedException() {
	}

	public FoodTruckAlreadyOpenedException(String message) {
		super(message);
	}

	public FoodTruckAlreadyOpenedException(String message, Throwable cause) {
		super(message, cause);
	}

	public FoodTruckAlreadyOpenedException(Throwable cause) {
		super(cause);
	}

}
