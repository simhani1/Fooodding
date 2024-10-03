package com.fooding.api.core.exception.handler;

import static com.fooding.api.core.exception.ResponseCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.waiting.exception.NoWaitingInfoException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class WaitingExHandler {

	@ExceptionHandler(NoWaitingInfoException.class)
	public ResponseEntity<BaseResponse<Object>> noWaitingInfoException(NoWaitingInfoException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_WAITING_INFO_EXCEPTION));
	}

}
