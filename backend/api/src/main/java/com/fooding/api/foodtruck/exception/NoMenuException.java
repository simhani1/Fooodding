package com.fooding.api.foodtruck.exception;

public class NoMenuException extends RuntimeException {

	public NoMenuException() {
	}

	public NoMenuException(String message) {
		super(message);
	}

	public NoMenuException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoMenuException(Throwable cause) {
		super(cause);
	}

}
