package com.fooding.api.member.exception;

public class AlreadyInactiveException extends RuntimeException {

	public AlreadyInactiveException() {
	}

	public AlreadyInactiveException(String message) {
		super(message);
	}

	public AlreadyInactiveException(String message, Throwable cause) {
		super(message, cause);
	}

	public AlreadyInactiveException(Throwable cause) {
		super(cause);
	}

}
