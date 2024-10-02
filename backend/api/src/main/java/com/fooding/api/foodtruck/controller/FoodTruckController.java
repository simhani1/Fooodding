package com.fooding.api.foodtruck.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
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
@RestController
public class FoodTruckController {

	private final FoodTruckQueryService foodTruckQueryService;
	private final FoodTruckCommandService foodTruckCommandService;
	private final CommerceQueryService commerceQueryService;

	@RequireJwtToken
	@PostMapping("")
	public ResponseEntity<BaseResponse<FoodTruckDto>> registerFoodTruck(@RequestBody FoodTruckReq req) {
		Long ownerId = MemberContext.getMemberId();
		FoodTruckDto res = foodTruckQueryService.registerFoodTruck(ownerId, FoodTruckDto.builder()
			.licenseNumber(req.licenseNumber())
			.name(req.name())
			.introduction(req.introduction())
			.category(req.category())
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
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

	@RequireJwtToken
	@GetMapping("/{ft-id}/users")
	public ResponseEntity<BaseResponse<FoodTruckDto>> getFoodTruckDetailForUser(
		@PathVariable("ft-id") Long foodTruckId) {
		Long memberId = MemberContext.getMemberId();
		return ResponseEntity.ok(
			BaseResponse.ofSuccess(foodTruckCommandService.getFoodTruckDetailForUser(memberId, foodTruckId)));
	}

	@RequireJwtToken
	@GetMapping("/owner")
	public ResponseEntity<BaseResponse<FoodTruckDto>> getFoodTruckDetailForOwner() {
		Long ownerId = MemberContext.getMemberId();
		return ResponseEntity.ok(
			BaseResponse.ofSuccess(foodTruckCommandService.getFoodTruckDetailForOwner(ownerId)));
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

	@PatchMapping("/{ft-id}/close")
	public ResponseEntity<BaseResponse<?>> closeFoodTruck(
		@PathVariable("ft-id") Long foodTruckId) {
		commerceQueryService.closeFoodTruck(foodTruckId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
