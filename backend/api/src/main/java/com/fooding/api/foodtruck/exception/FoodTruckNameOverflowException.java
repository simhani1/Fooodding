package com.fooding.api.foodtruck.exception;

public class FoodTruckNameOverflowException extends RuntimeException {

	public FoodTruckNameOverflowException() {
	}

	public FoodTruckNameOverflowException(String message) {
		super(message);
	}

	public FoodTruckNameOverflowException(String message, Throwable cause) {
		super(message, cause);
	}

	public FoodTruckNameOverflowException(Throwable cause) {
		super(cause);
	}

}
