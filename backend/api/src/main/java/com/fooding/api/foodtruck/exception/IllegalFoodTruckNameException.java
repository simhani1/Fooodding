package com.fooding.api.foodtruck.exception;

public class IllegalFoodTruckNameException extends RuntimeException {

	public IllegalFoodTruckNameException() {
	}

	public IllegalFoodTruckNameException(String message) {
		super(message);
	}

	public IllegalFoodTruckNameException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalFoodTruckNameException(Throwable cause) {
		super(cause);
	}

}
