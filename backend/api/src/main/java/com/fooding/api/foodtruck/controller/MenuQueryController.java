package com.fooding.api.foodtruck.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.MenuReq;
import com.fooding.api.foodtruck.facade.MenuFacade;
import com.fooding.api.foodtruck.service.MenuQueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MenuQueryController extends FoodTruckController {

	private final MenuFacade menuFacade;
	private final MenuQueryService menuQueryService;

	@PostMapping(value = "/menu")
	public ResponseEntity<BaseResponse<?>> registerMenu(
		@RequestPart("req") MenuReq req,
		@RequestPart(value = "menuImg", required = false) MultipartFile menuImg) {
		menuFacade.registerMenu(req, menuImg);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@PatchMapping(value = "/menu/{menu-id}")
	public ResponseEntity<BaseResponse<?>> updateMenu(
		@PathVariable("menu-id") Long menuId,
		@RequestPart("req") MenuReq req,
		@RequestPart(value = "menuImg", required = false) MultipartFile menuImg) {
		menuFacade.updateMenu(menuId, req, menuImg);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@DeleteMapping("/menu/{menu-id}")
	public ResponseEntity<BaseResponse<?>> deleteMenu(@PathVariable("menu-id") Long menuId) {
		menuQueryService.deleteMenu(menuId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

}
