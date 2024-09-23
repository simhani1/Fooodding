package com.fooding.api.member.service;

import com.fooding.api.member.service.dto.ReissueDto;

public interface ReissueTokenService {

	ReissueDto reissueToken(String refreshToken, String role);

}