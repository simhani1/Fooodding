package com.fooding.api.member.service.dto;

import lombok.Builder;

@Builder
public record LoginDto(
	String nickname,
	String accessToken,
	String refreshToken,
	Long foodTruckId,
	boolean isNewMember
) {
}