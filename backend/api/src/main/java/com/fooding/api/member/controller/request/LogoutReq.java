package com.fooding.api.member.controller.request;

import lombok.Builder;

@Builder
public record LogoutReq(String refreshToken) {
}