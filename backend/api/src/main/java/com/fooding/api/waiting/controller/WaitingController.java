package com.fooding.api.waiting.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.fcm.domain.TokenStatus;
import com.fooding.api.fcm.service.FcmTokenService;
import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.controller.response.GetReservationListRes;
import com.fooding.api.waiting.controller.response.GetUserReservationListRes;
import com.fooding.api.waiting.service.WaitingCommandService;
import com.fooding.api.waiting.service.WaitingQueryService;
import com.fooding.api.waiting.service.dto.UserWaitingInfoDto;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;
import com.fooding.api.waitinglog.service.WaitingLogCommandService;
import com.fooding.api.waitinglog.service.dto.WaitingTimeLogDto;
import com.fooding.api.waitinglog.service.dto.WaitingUserLogDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
@RestController
public class WaitingController {

	private final WaitingQueryService waitingQueryService;
	private final WaitingCommandService waitingCommandService;
	private final NotificationService notificationService;
	private final WaitingLogCommandService waitingLogCommandService;
	private final FcmTokenService fcmTokenService;

	@RequireJwtToken
	@PostMapping("/users")
	public ResponseEntity<BaseResponse<?>> reserve(@RequestParam("ft-id") Long foodTruckId) {
		Long userId = MemberContext.getMemberId();
		WaitingInfoDto res = waitingQueryService.reserve(userId, foodTruckId);
		notificationService.send(foodTruckId, "reserved", res);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@RequireJwtToken
	@DeleteMapping("/users/{ft-id}/{waiting-id}")
	public ResponseEntity<BaseResponse<?>> cancel(
		@PathVariable("ft-id") Long foodTruckId,
		@PathVariable("waiting-id") Long waitingId) {
		Long userId = MemberContext.getMemberId();
		waitingQueryService.cancel(userId, waitingId);
		notificationService.send(foodTruckId, "canceled", WaitingInfoDto.builder()
			.waitingId(waitingId).build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@RequireJwtToken
	@GetMapping(value = "/owners/{ft-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> getReservationList(
		@PathVariable("ft-id") Long foodTruckId) {
		Long ownerId = MemberContext.getMemberId();
		List<WaitingInfoDto> dtoList = waitingCommandService.getReservationList(ownerId, foodTruckId);
		GetReservationListRes res = GetReservationListRes.builder()
			.waitingLine(
				dtoList.stream()
					.filter(dto -> dto.cancelable())
					.collect(Collectors.toList()
					)
			)
			.orderLine(
				dtoList.stream()
					.filter(dto -> !dto.cancelable())
					.collect(Collectors.toList()
					)
			)
			.build();
		SseEmitter emitter = notificationService.send(foodTruckId, "connected", res);
		return ResponseEntity.ok(emitter);
	}

	@RequireJwtToken
	@PatchMapping("/{waiting-id}")
	public ResponseEntity<BaseResponse<WaitingInfoDto>> changeToOrderLine(@PathVariable("waiting-id") Long waitingId) {
		Long ownerId = MemberContext.getMemberId();
		WaitingInfoDto res = waitingQueryService.changeToOrderLine(ownerId, waitingId);
		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

	@RequireJwtToken
	@DeleteMapping("/owners/{waiting-id}")
	public ResponseEntity<BaseResponse<?>> callUser(
		@PathVariable("waiting-id") Long waitingId,
		@RequestParam("is-completed") boolean isCompleted
	) {
		Long ownerId = MemberContext.getMemberId();
		waitingQueryService.completeUser(ownerId, waitingId, isCompleted);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@RequireJwtToken
	@GetMapping("/users")
	public ResponseEntity<BaseResponse<GetUserReservationListRes>> getUserReservationList() {
		Long userId = MemberContext.getMemberId();
		List<UserWaitingInfoDto> userWaitingInfo = waitingCommandService.getUserReservationList(userId);
		TokenStatus tokenStatus = fcmTokenService.getTokenStatus(userId);
		GetUserReservationListRes res = GetUserReservationListRes.builder()
			.userWaitingInfo(userWaitingInfo)
			.tokenStatus(tokenStatus)
			.build();
		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

	@RequireJwtToken
	@GetMapping("/log/time")
	public ResponseEntity<BaseResponse<List<WaitingTimeLogDto>>> getWaitingTimeLog() {
		Long ownerId = MemberContext.getMemberId();
		List<WaitingTimeLogDto> res = waitingLogCommandService.getWaitingTimeLog(ownerId);
		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

	@RequireJwtToken
	@GetMapping("/log/users")
	public ResponseEntity<BaseResponse<List<WaitingUserLogDto>>> getWaitingUserLog() {
		Long ownerId = MemberContext.getMemberId();
		List<WaitingUserLogDto> res = waitingLogCommandService.getWaitingUserLog(ownerId);
		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

}
