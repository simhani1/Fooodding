package com.fooding.api.fcm.exception;

public class FailedFcmMulticast extends RuntimeException {

	public FailedFcmMulticast() {
	}

	public FailedFcmMulticast(String message) {
		super(message);
	}

	public FailedFcmMulticast(String message, Throwable cause) {
		super(message, cause);
	}

	public FailedFcmMulticast(Throwable cause) {
		super(cause);
	}

}
