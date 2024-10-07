package com.fooding.api.fcm.service;

import com.fooding.api.fcm.service.dto.FcmTokenDto;

public interface FcmTokenService {

	void saveToken(FcmTokenDto fcmTokenDto);

	void deleteToken(Long memberId);
	
}
