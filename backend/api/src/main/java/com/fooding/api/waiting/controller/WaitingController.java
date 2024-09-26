package com.fooding.api.waiting.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.waiting.service.WaitingQueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
@RestController
public class WaitingController {

	private final WaitingQueryService waitingQueryService;

	@RequireJwtToken
	@PostMapping("/foodtrucks/{ft-id}")
	public ResponseEntity<BaseResponse<?>> reserve(@PathVariable("ft-id") Long foodTruckId) {
		Long memberId = MemberContext.getMemberId();
		waitingQueryService.reserve(foodTruckId, memberId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
