package com.fooding.api.fcm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.fcm.controller.request.FcmTokenReq;
import com.fooding.api.fcm.service.FcmTokenService;
import com.fooding.api.fcm.service.dto.FcmTokenDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/fcm")
@RestController
public class FcmController {

	private final FcmTokenService fcmTokenService;

	@RequireJwtToken
	@PostMapping("/token")
	public ResponseEntity<BaseResponse<?>> saveFcmToken(@RequestBody FcmTokenReq req) {
		Long memberId = MemberContext.getMemberId();

		fcmTokenService.saveToken(FcmTokenDto.builder()
			.memberId(memberId)
			.token(req.token())
			.build());

		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@RequireJwtToken
	@PatchMapping("/token")
	public ResponseEntity<BaseResponse<?>> changeFcmToken() {
		Long memberId = MemberContext.getMemberId();
		fcmTokenService.changeToken(memberId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
