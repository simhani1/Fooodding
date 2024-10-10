package com.fooding.api.waitinglog.service;

import java.util.List;

import com.fooding.api.waitinglog.service.dto.WaitingLogDto;

public interface WaitingLogCommandService {

	List<WaitingLogDto> getWaitingLog(Long ownerId);

}
