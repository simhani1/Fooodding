package com.fooding.api.foodtruck.exception;

public class IllegalLicenseNumberException extends RuntimeException {

	public IllegalLicenseNumberException() {
	}

	public IllegalLicenseNumberException(String message) {
		super(message);
	}

	public IllegalLicenseNumberException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalLicenseNumberException(Throwable cause) {
		super(cause);
	}
	
}
