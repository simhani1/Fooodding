package com.fooding.api.member.service.dto;

import lombok.Builder;

@Builder
public record ReissueDto(
	String accessToken,
	String refreshToken
) {
}
