package com.fooding.api.waitinglog.service.dto;

import lombok.Builder;

@Builder
public record WaitingUserLogDto(
	String gender,
	String ages,
	long count
) {
}
