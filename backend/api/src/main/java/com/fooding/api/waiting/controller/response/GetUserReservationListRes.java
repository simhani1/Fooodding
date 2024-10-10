package com.fooding.api.waiting.controller.response;

import java.util.List;

import com.fooding.api.fcm.domain.TokenStatus;
import com.fooding.api.waiting.service.dto.UserWaitingInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GetUserReservationListRes {
	private List<UserWaitingInfoDto> userWaitingInfo;
	private TokenStatus tokenStatus;
}
