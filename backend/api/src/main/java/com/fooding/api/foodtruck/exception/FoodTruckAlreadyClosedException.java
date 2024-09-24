package com.fooding.api.foodtruck.exception;

public class FoodTruckAlreadyClosedException extends RuntimeException {

	public FoodTruckAlreadyClosedException() {
	}

	public FoodTruckAlreadyClosedException(String message) {
		super(message);
	}

	public FoodTruckAlreadyClosedException(String message, Throwable cause) {
		super(message, cause);
	}

	public FoodTruckAlreadyClosedException(Throwable cause) {
		super(cause);
	}

}
