package com.fooding.api.member.exception;

public class NoRefreshTokenException extends RuntimeException {

	public NoRefreshTokenException() {
	}

	public NoRefreshTokenException(String message) {
		super(message);
	}

	public NoRefreshTokenException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoRefreshTokenException(Throwable cause) {
		super(cause);
	}

}
