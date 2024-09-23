package com.fooding.api.member.controller.request;

import lombok.Builder;

@Builder
public record ReissueReq(
	String refreshToken,
	String role
) {
}