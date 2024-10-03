package com.fooding.api.fcm.controller.request;

import lombok.Builder;

@Builder
public record FcmTokenReq(
	String token
) {
}
