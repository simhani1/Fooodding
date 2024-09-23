package com.fooding.api.member.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fooding.api.core.jwt.JwtTokenProvider;
import com.fooding.api.core.jwt.dto.JwtToken;
import com.fooding.api.member.domain.MemberRole;
import com.fooding.api.member.service.ReissueTokenService;
import com.fooding.api.member.service.dto.ReissueDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
class ReissueTokenServiceImpl implements ReissueTokenService {

	private final JwtTokenProvider jwtTokenProvider;

	@Value("${jwt.refresh-token.expiretime}")
	private int REFRESH_TOKEN_EXPIRATION_TIME;

	@Override
	public ReissueDto reissueToken(String refreshToken, String role) {
		Long memberId = jwtTokenProvider.getMemberIdFromRefreshToken(refreshToken);
		jwtTokenProvider.deleteRefreshToken(refreshToken);
		JwtToken newToken = jwtTokenProvider.createToken(memberId, MemberRole.valueOf(role));
		return ReissueDto.builder()
			.accessToken(newToken.accessToken())
			.refreshToken(newToken.refreshToken())
			.build();
	}
}