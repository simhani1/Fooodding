package com.fooding.api.fcm.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.fcm.domain.FcmToken;
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

	MemberRepository memberRepository;
	FcmTokenRepository fcmTokenRepository;

	@Override
	public void saveToken(FcmTokenDto fcmTokenDto) {
		Member member = memberRepository.findById(fcmTokenDto.memberId())
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + fcmTokenDto.memberId()));
		fcmTokenRepository.save(FcmToken.builder()
			.token(fcmTokenDto.token())
			.member(member)
			.build());
	}

}
