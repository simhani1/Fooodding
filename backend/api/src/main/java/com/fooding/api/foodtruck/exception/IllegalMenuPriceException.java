package com.fooding.api.foodtruck.exception;

public class IllegalMenuPriceException extends RuntimeException {

	public IllegalMenuPriceException() {
	}

	public IllegalMenuPriceException(String message) {
		super(message);
	}

	public IllegalMenuPriceException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalMenuPriceException(Throwable cause) {
		super(cause);
	}

}
