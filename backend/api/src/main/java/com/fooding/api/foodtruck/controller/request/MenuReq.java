package com.fooding.api.foodtruck.controller.request;

import lombok.Builder;

@Builder
public record MenuReq(
	String name,
	int price,
	boolean onSale
) {
}