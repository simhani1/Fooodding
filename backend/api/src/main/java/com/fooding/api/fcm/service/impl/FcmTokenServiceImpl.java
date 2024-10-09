package com.fooding.api.fcm.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.fcm.domain.FcmToken;
import com.fooding.api.fcm.domain.TokenStatus;
import com.fooding.api.fcm.exception.NoFcmTokenException;
import com.fooding.api.fcm.repository.FcmTokenRepository;
import com.fooding.api.fcm.service.FcmTokenService;
import com.fooding.api.fcm.service.dto.FcmTokenDto;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
class FcmTokenServiceImpl implements FcmTokenService {

	private final MemberRepository memberRepository;
	private final FcmTokenRepository fcmTokenRepository;

	@Override
	public void saveToken(FcmTokenDto fcmTokenDto) {
		Member member = memberRepository.findById(fcmTokenDto.memberId())
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + fcmTokenDto.memberId()));
		fcmTokenRepository.save(FcmToken.builder()
			.token(fcmTokenDto.token())
			.member(member)
			.build());
	}

	@Override
	public void changeToken(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + memberId));
		List<FcmToken> fcmTokens = fcmTokenRepository.findByMemberId(memberId);
		if (!fcmTokens.isEmpty()) {
			fcmTokens.forEach(FcmToken::changeStatus);
		} else {
			throw new NoFcmTokenException("FCM Token not found with ID: " + memberId);
		}
	}

	@Override
	public TokenStatus getTokenStatus(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + memberId));
		List<FcmToken> fcmTokens = fcmTokenRepository.findByMemberId(memberId);
		if (!fcmTokens.isEmpty()) {
			return fcmTokens.get(0).getStatus();
		}
		return TokenStatus.NONE;
	}

}
