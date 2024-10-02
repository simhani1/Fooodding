package com.fooding.api.waiting.service.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public record WaitingInfoDto(
	Integer number,
	Long rank,
	LocalDateTime reservedAt,
	boolean cancelable
) {
}
