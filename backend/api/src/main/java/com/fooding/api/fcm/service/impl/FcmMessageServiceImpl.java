package com.fooding.api.fcm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.fcm.domain.FcmToken;
import com.fooding.api.fcm.domain.TokenStatus;
import com.fooding.api.fcm.exception.FailedFcmMulticast;
import com.fooding.api.fcm.repository.FcmTokenRepository;
import com.fooding.api.fcm.service.FcmMessageService;
import com.fooding.api.fcm.service.dto.FcmMessageDto;
import com.fooding.api.member.domain.MemberRole;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
class FcmMessageServiceImpl implements FcmMessageService {

	private final int TOKEN_BATCH_SIZE = 500;
	private final FcmTokenRepository fcmTokenRepository;

	@Override
	public void sendMessages(Long memberId, FcmMessageDto dto) {
		List<FcmToken> tokens = fcmTokenRepository.findByMemberId(memberId);
		List<String> tokenList = tokens.stream()
			.filter(token -> token.getStatus() == TokenStatus.ACTIVE)
			.map(FcmToken::getToken)
			.collect(Collectors.toList());
		sendEachForMulticast(dto, tokenList);
	}

	@Override
	public void sendMessagesToOwners(FcmMessageDto dto) {
		List<FcmToken> ownerTokens = fcmTokenRepository.findByMemberRole(MemberRole.OWNER);
		List<String> tokenList = ownerTokens.stream()
			.filter(token -> token.getStatus().equals(TokenStatus.ACTIVE))
			.map(FcmToken::getToken)
			.collect(Collectors.toList());
		for (int i = 0; i < tokenList.size(); i += TOKEN_BATCH_SIZE) {
			List<String> subTokenList = tokenList.subList(i, Math.min(i + TOKEN_BATCH_SIZE, tokenList.size()));
			sendEachForMulticast(dto, tokenList);
		}
	}

	private void sendEachForMulticast(FcmMessageDto dto, List<String> tokenList) {
		MulticastMessage message = MulticastMessage.builder()
			.addAllTokens(tokenList)
			.setNotification(Notification.builder()
				.setTitle(dto.title())
				.setBody(dto.message())
				.build())
			.build();
		try {
			FirebaseMessaging.getInstance().sendEachForMulticast(message);
		} catch (FirebaseMessagingException e) {
			throw new FailedFcmMulticast();
		}
	}

}
