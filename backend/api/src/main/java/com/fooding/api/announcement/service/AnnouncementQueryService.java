package com.fooding.api.announcement.service;

import com.fooding.api.announcement.service.dto.AnnouncementLogDto;

public interface AnnouncementQueryService {

	void registerAnnouncement();

	void saveAnnouncementLog(AnnouncementLogDto announcementLogDto);

}
