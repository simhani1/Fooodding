package com.fooding.api.fcm.service.dto;

import lombok.Builder;

@Builder
public record FcmMessageDto(
	String title,
	String message
) {
}