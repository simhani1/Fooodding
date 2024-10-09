package com.fooding.api.fcm.service;

import com.fooding.api.fcm.domain.TokenStatus;
import com.fooding.api.fcm.service.dto.FcmTokenDto;

public interface FcmTokenService {

	void saveToken(FcmTokenDto fcmTokenDto);

	void changeToken(Long memberId);

	TokenStatus getTokenStatus(Long memberId);

}
