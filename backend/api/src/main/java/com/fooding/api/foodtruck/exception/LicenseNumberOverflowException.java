package com.fooding.api.foodtruck.exception;

public class LicenseNumberOverflowException extends RuntimeException {

	public LicenseNumberOverflowException() {
	}

	public LicenseNumberOverflowException(String message) {
		super(message);
	}

	public LicenseNumberOverflowException(String message, Throwable cause) {
		super(message, cause);
	}

	public LicenseNumberOverflowException(Throwable cause) {
		super(cause);
	}
	
}
