package com.fooding.api.owner.exception;

public class NoOwnerException extends RuntimeException {

	public NoOwnerException() {
	}

	public NoOwnerException(String message) {
		super(message);
	}

	public NoOwnerException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoOwnerException(Throwable cause) {
		super(cause);
	}

}
