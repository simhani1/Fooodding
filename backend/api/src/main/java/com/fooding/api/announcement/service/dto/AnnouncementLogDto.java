package com.fooding.api.announcement.service.dto;

import lombok.Builder;

@Builder
public record AnnouncementLogDto(
	Long memberId,
	Long announcementId
) {
}
