package com.fooding.api.foodtruck.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.CommerceReq;
import com.fooding.api.foodtruck.controller.request.FoodTruckReq;
import com.fooding.api.foodtruck.service.CommerceQueryService;
import com.fooding.api.foodtruck.service.FoodTruckCommandService;
import com.fooding.api.foodtruck.service.FoodTruckQueryService;
import com.fooding.api.foodtruck.service.dto.CommerceDto;
import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/foodtrucks")
public class FoodTruckController {

	private final FoodTruckQueryService foodTruckQueryService;
	private final FoodTruckCommandService foodTruckCommandService;
	private final CommerceQueryService commerceQueryService;

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

	@PatchMapping("/{ft-id}")
	public ResponseEntity<BaseResponse<?>> updateFoodTruck(
		@PathVariable("ft-id") Long foodTruckId,
		@RequestBody FoodTruckReq req) {
		foodTruckQueryService.updateFoodTruck(foodTruckId, FoodTruckDto.builder()
			.licenseNumber(req.licenseNumber())
			.name(req.name())
			.introduction(req.introduction())
			.category(req.category())
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@GetMapping("")
	public ResponseEntity<BaseResponse<FoodTruckDto>> getFoodTruckDetail(@RequestParam("ft-id") Long foodTruckId) {
		return ResponseEntity.ok(BaseResponse.ofSuccess(foodTruckCommandService.getFoodTruckDetail(foodTruckId)));
	}

	@PatchMapping("/{ft-id}/open")
	public ResponseEntity<BaseResponse<?>> openFoodTruck(
		@PathVariable("ft-id") Long foodTruckId,
		@RequestBody CommerceReq req) {
		commerceQueryService.openFoodTruck(foodTruckId, CommerceDto.builder()
				.latitude(req.latitude())
				.longitude(req.longitude())
				.build(),
			req.menuList());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
