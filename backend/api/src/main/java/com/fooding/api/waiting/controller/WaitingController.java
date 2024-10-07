package com.fooding.api.waiting.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.controller.response.GetReservationListRes;
import com.fooding.api.waiting.service.WaitingCommandService;
import com.fooding.api.waiting.service.WaitingQueryService;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;

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

	@RequireJwtToken
	@GetMapping(value = "/foodtrucks/{ft-id}/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
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

}
