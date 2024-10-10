package com.fooding.api.fcm.util;

import com.fooding.api.fcm.service.dto.FcmMessageDto;

public class FcmMessageFactory {

	public static FcmMessageDto createCustomerTurnMessage() {
		return FcmMessageDto.builder()
			.title("고객님의 차례입니다")
			.message("10분 이내에 와주세요!")
			.build();
	}

	public static FcmMessageDto createNewAnnouncementMessage(String message) {
		return FcmMessageDto.builder()
			.title("새로운 공고가 등록됐어요!📢")
			.message("지금 확인해보세요!")
			.build();
	}

}
