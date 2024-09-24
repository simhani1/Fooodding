package com.fooding.api.foodtruck.exception;

public class AlreadyOpenedException extends RuntimeException {

	public AlreadyOpenedException() {
	}

	public AlreadyOpenedException(String message) {
		super(message);
	}

	public AlreadyOpenedException(String message, Throwable cause) {
		super(message, cause);
	}

	public AlreadyOpenedException(Throwable cause) {
		super(cause);
	}

}
