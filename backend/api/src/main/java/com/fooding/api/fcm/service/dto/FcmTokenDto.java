package com.fooding.api.fcm.service.dto;

import lombok.Builder;

@Builder
public record FcmTokenDto(
	Long memberId,
	String token
) {
}
