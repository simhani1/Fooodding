package com.fooding.api.foodtruck.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.FoodTruckReq;
import com.fooding.api.foodtruck.service.FoodTruckCommandService;
import com.fooding.api.foodtruck.service.FoodTruckQueryService;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/foodtrucks")
public class FoodTruckController {

	private final FoodTruckQueryService foodTruckQueryService;
	private final FoodTruckCommandService foodTruckCommandService;

	@PostMapping("")
	public ResponseEntity<BaseResponse<?>> registerFoodTruck(@RequestBody FoodTruckReq req) {
		foodTruckQueryService.registerFoodTruck(1L, FoodTruckDto.builder()
			.licenseNumber(req.licenseNumber())
			.name(req.name())
			.introduction(req.introduction())
			.category(req.category())
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@GetMapping("")
	public ResponseEntity<BaseResponse<FoodTruckDto>> getAllFoodTrucks(@RequestParam("ft-id") Long foodTruckId) {
		return ResponseEntity.ok(BaseResponse.ofSuccess(foodTruckCommandService.getFoodTruckDetail(foodTruckId)));
	}

}
