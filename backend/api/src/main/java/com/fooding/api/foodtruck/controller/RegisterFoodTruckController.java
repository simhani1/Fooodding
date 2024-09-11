package com.fooding.api.foodtruck.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.FoodTruckReq;
import com.fooding.api.foodtruck.service.RegisterFoodTruckService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RegisterFoodTruckController extends FoodTruckController {

	private final RegisterFoodTruckService registerFoodTruckService;

	@PostMapping("")
	public ResponseEntity<BaseResponse<?>> registerFoodTruck(@RequestBody FoodTruckReq req) {
		registerFoodTruckService.registerFoodTruck(1L, FoodTruckDto.builder()
			.licenseNumber(req.licenseNumber())
			.name(req.name())
			.introduction(req.introduction())
			.category(req.category())
			.phoneNumber(req.phoneNumber())
			.snsLink(req.snsLink())
			.bank(req.bank())
			.accountName(req.accountName())
			.accountNumber(req.accountNumber())
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
