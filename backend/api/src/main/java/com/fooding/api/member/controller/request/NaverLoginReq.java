package com.fooding.api.member.controller.request;

import lombok.Builder;

@Builder
public record NaverLoginReq(
	String accessToken,
	String role
) {
}
