package com.fooding.api.waitinglog.service.dto;

import lombok.Builder;

@Builder
public record WaitingTimeLogDto(
	String dayOfWeek,
	String time,
	long count
) {
}
