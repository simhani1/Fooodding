package com.fooding.api.announcement.controller.response;

import java.util.List;

import com.fooding.api.announcement.service.dto.AnnouncementDto;
import com.fooding.api.fcm.domain.TokenStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAnnouncementRes {
	private List<AnnouncementDto> announcements;
	private TokenStatus tokenStatus;
}
