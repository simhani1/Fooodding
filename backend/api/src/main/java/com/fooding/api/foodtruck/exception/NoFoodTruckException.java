package com.fooding.api.foodtruck.exception;

public class NoFoodTruckException extends RuntimeException {

	public NoFoodTruckException() {
	}

	public NoFoodTruckException(String message) {
		super(message);
	}

	public NoFoodTruckException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoFoodTruckException(Throwable cause) {
		super(cause);
	}

}
