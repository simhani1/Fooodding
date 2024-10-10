package com.fooding.api.waitinglog.service.dto;

import lombok.Builder;

@Builder
public record WaitingLogDto(
	Long waitingLogId,
	String time,
	String dayOfWeek,
	String gender,
	String ages
) {
}
