package com.fooding.api.core.jwt.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
public record JwtToken(
	String accessToken,
	String refreshToken
)
{
}
