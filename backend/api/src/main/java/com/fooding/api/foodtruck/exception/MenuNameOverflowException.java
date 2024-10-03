package com.fooding.api.foodtruck.exception;

public class MenuNameOverflowException extends RuntimeException {

	public MenuNameOverflowException() {
	}

	public MenuNameOverflowException(String message) {
		super(message);
	}

	public MenuNameOverflowException(String message, Throwable cause) {
		super(message, cause);
	}

	public MenuNameOverflowException(Throwable cause) {
		super(cause);
	}

}
