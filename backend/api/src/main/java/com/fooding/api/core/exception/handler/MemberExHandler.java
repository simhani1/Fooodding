package com.fooding.api.core.exception.handler;

import static com.fooding.api.core.exception.ResponseCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fooding.api.core.jwt.exception.ExpiredJwtException;
import com.fooding.api.core.jwt.exception.UnAuthorizedException;
import com.fooding.api.core.jwt.exception.UnSupportedJwtException;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.member.exception.AlreadyInactiveException;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.exception.NoRefreshTokenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class MemberExHandler {

	@ExceptionHandler(AlreadyInactiveException.class)
	public ResponseEntity<BaseResponse<Object>> alreadyInactiveException(AlreadyInactiveException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(ALREADY_INACTIVE_EXCEPTION));
	}

	@ExceptionHandler(NoMemberException.class)
	public ResponseEntity<BaseResponse<Object>> noMemberException(NoMemberException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_MEMBER_EXCEPTION));
	}

	@ExceptionHandler(NoRefreshTokenException.class)
	public ResponseEntity<BaseResponse<Object>> noRefreshTokenException(NoRefreshTokenException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_REFRESH_TOKEN_EXCEPTION));
	}

	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<BaseResponse<Object>> expiredJwtException(ExpiredJwtException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(EXPIRED_JWT_EXCEPTION));
	}

	@ExceptionHandler(UnAuthorizedException.class)
	public ResponseEntity<BaseResponse<Object>> unAuthorizedException(UnAuthorizedException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
			.body(BaseResponse.ofFail(UNAUTHORIZED_EXCEPTION));
	}

	@ExceptionHandler(UnSupportedJwtException.class)
	public ResponseEntity<BaseResponse<Object>> unSupportedJwtException(UnSupportedJwtException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(UNSUPPORTED_JWT_EXCEPTION));
	}

}
