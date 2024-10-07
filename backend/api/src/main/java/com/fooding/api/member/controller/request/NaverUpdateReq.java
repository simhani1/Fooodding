package com.fooding.api.member.controller.request;

import lombok.Builder;

@Builder
public record NaverUpdateReq(
	String gender,
	String ages
) {
}
