package com.fooding.api.waiting.controller.response;

import java.util.List;

import com.fooding.api.waiting.service.dto.WaitingInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GetReservationListRes {

	private List<WaitingInfoDto> waitingLine;
	private List<WaitingInfoDto> orderLine;

}
