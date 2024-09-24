package com.fooding.api.foodtruck.exception;

public class AlreadyClosedException extends RuntimeException {

	public AlreadyClosedException() {
	}

	public AlreadyClosedException(String message) {
		super(message);
	}

	public AlreadyClosedException(String message, Throwable cause) {
		super(message, cause);
	}

	public AlreadyClosedException(Throwable cause) {
		super(cause);
	}

}
