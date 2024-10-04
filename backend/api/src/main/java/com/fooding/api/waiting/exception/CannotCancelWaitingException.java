package com.fooding.api.waiting.exception;

public class CannotCancelWaitingException extends RuntimeException {

	public CannotCancelWaitingException() {
	}

	public CannotCancelWaitingException(String message) {
		super(message);
	}

	public CannotCancelWaitingException(String message, Throwable cause) {
		super(message, cause);
	}

	public CannotCancelWaitingException(Throwable cause) {
		super(cause);
	}

}
