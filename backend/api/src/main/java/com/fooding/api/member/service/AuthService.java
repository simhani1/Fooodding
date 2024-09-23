package com.fooding.api.member.service;

import com.fooding.api.member.service.dto.LoginDto;

public interface AuthService {

	LoginDto naverLogin(String accessToken, String role);

	void logout(Long memberId, String refreshToken);

	void withdraw(Long memberId);

}
