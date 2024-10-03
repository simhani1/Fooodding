package com.fooding.api.core.exception.handler;

import static com.fooding.api.core.exception.ResponseCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fooding.api.announcement.exception.NoAnnouncementException;
import com.fooding.api.core.template.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class AnnouncementExHandler {

	@ExceptionHandler(NoAnnouncementException.class)
	public ResponseEntity<BaseResponse<Object>> noAnnouncementException(NoAnnouncementException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_ANNOUNCEMENT_EXCEPTION));
	}

}
