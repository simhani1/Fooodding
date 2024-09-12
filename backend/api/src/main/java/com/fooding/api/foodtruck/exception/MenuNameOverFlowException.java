package com.fooding.api.foodtruck.exception;

public class MenuNameOverFlowException extends RuntimeException {

	public MenuNameOverFlowException() {
	}

	public MenuNameOverFlowException(String message) {
		super(message);
	}

	public MenuNameOverFlowException(String message, Throwable cause) {
		super(message, cause);
	}

	public MenuNameOverFlowException(Throwable cause) {
		super(cause);
	}

}
