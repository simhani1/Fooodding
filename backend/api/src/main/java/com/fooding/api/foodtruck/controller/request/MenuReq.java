package com.fooding.api.foodtruck.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MenuReq(
	String name,
	int price
) {
}