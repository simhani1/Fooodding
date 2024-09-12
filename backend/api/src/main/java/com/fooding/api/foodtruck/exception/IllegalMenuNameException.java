package com.fooding.api.foodtruck.exception;

public class IllegalMenuNameException extends RuntimeException {

	public IllegalMenuNameException() {
	}

	public IllegalMenuNameException(String message) {
		super(message);
	}

	public IllegalMenuNameException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalMenuNameException(Throwable cause) {
		super(cause);
	}

}
