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
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
class FcmMessageServiceImpl implements FcmMessageService {

	private final FcmTokenRepository fcmTokenRepository;

	@Override
	public void sendMessages(Long memberId, FcmMessageDto fcmMessageDto) throws FirebaseMessagingException {
		List<FcmToken> tokens = fcmTokenRepository.findByMemberId(memberId);

		List<String> tokenList = tokens.stream()
			.filter(token -> token.getStatus() == TokenStatus.ACTIVE)
			.map(FcmToken::getToken)
			.collect(Collectors.toList());

		MulticastMessage message = MulticastMessage.builder()
			.addAllTokens(tokenList)
			.setNotification(Notification.builder()
				.setTitle(fcmMessageDto.title())
				.setBody(fcmMessageDto.message())
				.build())
			.build();

		BatchResponse response = FirebaseMessaging.getInstance().sendEachForMulticast(message);
	}

	@Override
	public void sendMessagesToOwners(FcmMessageDto fcmMessageDto) {
		List<FcmToken> ownerTokens = fcmTokenRepository.findByMemberRole(MemberRole.OWNER);

		List<String> tokenList = ownerTokens.stream()
			.filter(token -> token.getStatus() == TokenStatus.ACTIVE)
			.map(FcmToken::getToken)
			.collect(Collectors.toList());

		int tokenSize = 500;
		for (int i = 0; i < tokenList.size(); i += tokenSize) {
			List<String> batchTokens = tokenList.subList(i, Math.min(i + tokenSize, tokenList.size()));

			MulticastMessage message = MulticastMessage.builder()
				.addAllTokens(batchTokens)
				.setNotification(Notification.builder()
					.setTitle(fcmMessageDto.title())
					.setBody(fcmMessageDto.message())
					.build())
				.build();

			try {
				BatchResponse response = FirebaseMessaging.getInstance().sendEachForMulticast(message);
			} catch (FirebaseMessagingException e) {
				e.printStackTrace();
			}
		}
	}

}
