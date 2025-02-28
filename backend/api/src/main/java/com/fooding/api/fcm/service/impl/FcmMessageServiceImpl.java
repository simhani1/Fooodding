package com.fooding.api.fcm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.fcm.domain.FcmToken;
import com.fooding.api.fcm.domain.TokenStatus;
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
	public void sendMessages(Long memberId, FcmMessageDto dto) throws FirebaseMessagingException {
		List<FcmToken> tokens = fcmTokenRepository.findByMemberIdAndStatus(memberId, TokenStatus.ACTIVE);
		if (!tokens.isEmpty()) {
			List<String> tokenList = tokens.stream()
				.map(FcmToken::getToken)
				.collect(Collectors.toList());
			sendEachForMulticast(dto, tokenList);
		}
	}

	@Override
	public void sendMessagesToOwners(FcmMessageDto dto) throws FirebaseMessagingException {
		List<FcmToken> ownerTokens = fcmTokenRepository.findByMemberRoleAndStatus(MemberRole.OWNER, TokenStatus.ACTIVE);
		List<String> tokenList = ownerTokens.stream()
			.map(FcmToken::getToken)
			.collect(Collectors.toList());
		for (int i = 0; i < tokenList.size(); i += TOKEN_BATCH_SIZE) {
			List<String> subTokenList = tokenList.subList(i, Math.min(i + TOKEN_BATCH_SIZE, tokenList.size()));
			sendEachForMulticast(dto, tokenList);
		}
	}

	private void sendEachForMulticast(FcmMessageDto dto, List<String> tokenList) throws FirebaseMessagingException {
		MulticastMessage message = MulticastMessage.builder()
			.addAllTokens(tokenList)
			.setNotification(Notification.builder()
				.setTitle(dto.title())
				.setBody(dto.message())
				.build())
			.build();
		FirebaseMessaging.getInstance().sendEachForMulticast(message);
	}

}
