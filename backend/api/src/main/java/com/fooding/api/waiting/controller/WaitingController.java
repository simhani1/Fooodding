package com.fooding.api.waiting.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.waiting.service.WaitingQueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
@RestController
public class WaitingController {

	private final WaitingQueryService waitingQueryService;
	private final FoodTruckRepositoryCustom foodTruckRepositoryCustom;

	@RequireJwtToken
	@PostMapping("/foodtrucks/{ft-id}")
	public ResponseEntity<BaseResponse<?>> reserve(@PathVariable("ft-id") Long foodTruckId) {
		Long userId = MemberContext.getMemberId();
		waitingQueryService.reserve(userId, foodTruckId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@RequireJwtToken
	@DeleteMapping("/{waiting-id}")
	public ResponseEntity<BaseResponse<?>> cancel(@PathVariable("waiting-id") Long waitingId) {
		Long userId = MemberContext.getMemberId();
		waitingQueryService.cancel(userId, waitingId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
