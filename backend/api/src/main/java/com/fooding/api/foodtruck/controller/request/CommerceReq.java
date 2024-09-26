package com.fooding.api.foodtruck.controller.request;

import java.util.List;

import lombok.Builder;

@Builder
public record CommerceReq(
	Double latitude,
	Double longitude,
	List<Long> menuList
) {
}
