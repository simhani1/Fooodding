package com.fooding.api.core.exception;

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

	// 5000 - ANNOUNCEMENT
	NO_ANNOUNCEMENT_EXCEPTION("5000", "해당 공고 데이터가 없습니다."),

	// 6000 - FOODTRUCK
	FOODTRUCK_ALREADY_CLOSED_EXCEPTION("6000", "장사를 마감한 푸드트럭입니다."),
	FOODTRUCK_ALREADY_OPENED_EXCEPTION("6001", "이미 장사 중인 푸드트럭입니다."),
	FOODTRUCK_INTRODUCTION_OVERFLOW_EXCEPTION("6002", "푸드트럭 소개가 너무 깁니다."),
	FOODTRUCK_NAME_OVERFLOW_EXCEPTION("6003", "푸드트럭 이름이 너무 깁니다."),
	ILLEGAL_FOOD_TRUCK_NAME_EXCEPTION("6004", "잘못된 푸드트럭 이름입니다."),
	ILLEGAL_LICENSE_NUMBER_EXCEPTION("6005", "잘못된 라이센스 번호입니다."),
	ILLEGAL_MENU_NAME_EXCEPTION("6006", "잘못된 메뉴 이름입니다."),
	ILLEGAL_MENU_PRICE_EXCEPTION("6007", "잘못된 메뉴 가격입니다."),
	LICENSE_NUMBER_OVERFLOW_EXCEPTION("6008", "라이센스 번호가 너무 깁니다."),
	MENU_NAME_OVERFLOW_EXCEPTION("6009", "메뉴 이름이 너무 깁니다."),
	NO_FOOD_TRUCK_EXCEPTION("6010", "존재하지 않는 푸드트럭입니다."),
	NO_MENU_EXCEPTION("6011", "존재하지 않는 메뉴입니다."),

	// 7000 - MEMBER
	ALREADY_INACTIVE_EXCEPTION("7000", "이미 비활성화된 상태입니다."),
	NO_MEMBER_EXCEPTION("7001", "존재하지 않는 회원입니다."),
	NO_REFRESH_TOKEN_EXCEPTION("7002", "리프레시 토큰이 존재하지 않습니다."),

	// 8000 - WAITING
	NO_WAITING_INFO_EXCEPTION("8000", "예약 정보가 존재하지 않습니다."),
	;

	private String code;
	private String message;

}
