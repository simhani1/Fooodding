package com.fooding.api.announcement.service;

import java.util.List;

import com.fooding.api.announcement.service.dto.AnnouncementDto;

public interface AnnouncementCommandService {

	List<AnnouncementDto> getAnnouncementByOwner(Long ownerId);

}
