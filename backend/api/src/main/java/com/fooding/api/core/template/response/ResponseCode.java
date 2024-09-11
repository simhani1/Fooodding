package com.fooding.api.core.template.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

	// 2000 - 성공
	OK("2000", "성공"),

	// 3000 - SECURITY
	UNAUTHENTICATED("3000", "인증되지 않은 사용자입니다."),
	EXPIRED_JWT_EXCEPTION("3001", "jwt 토큰이 만료되었습니다."),
	UNSUPPORTED_JWT_EXCEPTION("3002", "토큰 발급자가 일치하지 않습니다."),
	UNAUTHORIZED_EXCEPTION("3003", "토큰이 없거나 인증 과정에서 오류가 발생헀습니다."),

	// 4000 - S3
	FILE_SIZE_OVERFLOW("4000", "개별 사진 사이즈는 최대 10MB, 총합 사이즈는 최대 100MB를 초과할 수 없습니다."),
	FAIL_TO_UPLOAD_FILE("4001", "AWS 서비스가 원활하지 않아 사진 업로드에 실패했습니다."),
	FILE_NOT_FOUND("4002", "이미지 파일을 찾을 수 없습니다."),
	;

	private String code;
	private String message;

}
