package com.fooding.api.announcement.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record AnnouncementDto(
	Long announcementId,
	String url,
	String title,
	String date,
	String time,
	String place,
	@JsonProperty("isOpened")
	boolean opened
) {
}
