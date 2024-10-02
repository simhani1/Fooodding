package com.fooding.api.waiting.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record WaitingInfoDto(
	Integer number,
	Long rank,
	Long changedAt,
	@JsonProperty("isCancelable")
	boolean cancelable
) {
}
