package com.fooding.api.core.exception.handler;

import static com.fooding.api.core.exception.ResponseCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.fcm.exception.FailedFcmMulticast;
import com.fooding.api.fcm.exception.NoFcmTokenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class FcmExHandler {

	@ExceptionHandler(NoFcmTokenException.class)
	public ResponseEntity<BaseResponse<Object>> noFcmTokenException(NoFcmTokenException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_FCM_TOKEN));
	}

	@ExceptionHandler(FailedFcmMulticast.class)
	public ResponseEntity<BaseResponse<Object>> failedFcmMulticast(FailedFcmMulticast e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(FAILED_FCM_MULTICAST));
	}

}
