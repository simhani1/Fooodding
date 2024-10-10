package com.fooding.api.fcm.service;

import com.fooding.api.fcm.service.dto.FcmMessageDto;

public interface FcmMessageService {

	void sendMessages(Long memberId, FcmMessageDto dto);

	void sendMessagesToOwners(FcmMessageDto dto);

}
