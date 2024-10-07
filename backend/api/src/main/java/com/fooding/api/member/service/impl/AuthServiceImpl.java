package com.fooding.api.member.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.core.jwt.JwtTokenProvider;
import com.fooding.api.core.jwt.dto.JwtToken;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.infra.oauth.client.NaverAuthClient;
import com.fooding.api.infra.oauth.dto.NaverMemberInfo;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.domain.MemberRole;
import com.fooding.api.member.domain.Provider;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.member.service.AuthService;
import com.fooding.api.member.service.dto.LoginDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
class AuthServiceImpl implements AuthService {

	private final NaverAuthClient naverAuthClient;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final FoodTruckRepositoryCustom foodTruckRepositoryCustom;

	@Override
	public LoginDto naverLogin(String accessToken, String role) {
		NaverMemberInfo naverMemberInfo = naverAuthClient.getUserInfo(accessToken);
		String email = naverMemberInfo.getNaverAccount().getEmail();
		Member member = memberRepository.findByEmailAndProviderAndRole(email, Provider.NAVER,
				MemberRole.valueOf(role))
			.orElseGet(() ->
				// 회원정보가 존재하지 않으면 신규 가입
				memberRepository.save(Member.builder()
					.email(email)
					.nickname(naverMemberInfo.getNaverAccount().getNickname())
					.provider(Provider.NAVER)
					.role(MemberRole.valueOf(role))
					.build())
			);
		/* 로그인 */
		JwtToken jwtToken = jwtTokenProvider.createToken(member.getId(), MemberRole.valueOf(role));

		LoginDto dto = foodTruckRepositoryCustom.findByOwner(member)
			.map(foodTruck -> LoginDto.builder()
				.nickname(member.getNickname())
				.accessToken(jwtToken.accessToken())
				.refreshToken(jwtToken.refreshToken())
				.foodTruckId(foodTruck.getId())
				.build())
			.orElseGet(() -> LoginDto.builder()
				.nickname(member.getNickname())
				.accessToken(jwtToken.accessToken())
				.refreshToken(jwtToken.refreshToken())
				.foodTruckId(null)
				.build());
		return dto;
	}

	@Override
	public void logout(Long memberId, String refreshToken) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + memberId));
		jwtTokenProvider.deleteRefreshToken(refreshToken);
	}

	@Override
	public void withdraw(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + memberId));
		member.inactive();
	}

}
