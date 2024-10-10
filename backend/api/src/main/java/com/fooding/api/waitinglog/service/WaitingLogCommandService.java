package com.fooding.api.waitinglog.service;

import java.util.List;

import com.fooding.api.waitinglog.service.dto.WaitingTimeLogDto;
import com.fooding.api.waitinglog.service.dto.WaitingUserLogDto;

public interface WaitingLogCommandService {

	List<WaitingTimeLogDto> getWaitingTimeLog(Long ownerId);

	List<WaitingUserLogDto> getWaitingUserLog(Long ownerId);

}
