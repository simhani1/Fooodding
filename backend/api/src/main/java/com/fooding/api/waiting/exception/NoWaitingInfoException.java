package com.fooding.api.waiting.exception;

public class NoWaitingInfoException extends RuntimeException {

	public NoWaitingInfoException() {
	}

	public NoWaitingInfoException(String message) {
		super(message);
	}

	public NoWaitingInfoException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoWaitingInfoException(Throwable cause) {
		super(cause);
	}
	
}
