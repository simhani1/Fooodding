package com.fooding.api.fcm.exception;

public class NoFcmTokenException extends RuntimeException {

	public NoFcmTokenException() {
	}

	public NoFcmTokenException(String message) {
		super(message);
	}

	public NoFcmTokenException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoFcmTokenException(Throwable cause) {
		super(cause);
	}

}
