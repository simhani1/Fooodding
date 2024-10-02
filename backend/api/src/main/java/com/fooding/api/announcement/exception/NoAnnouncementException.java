package com.fooding.api.announcement.exception;

public class NoAnnouncementException extends RuntimeException {

	public NoAnnouncementException() {
	}

	public NoAnnouncementException(String message) {
		super(message);
	}

	public NoAnnouncementException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoAnnouncementException(Throwable cause) {
		super(cause);
	}

}
