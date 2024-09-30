package com.fooding.api.foodtruck.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.MenuReq;
import com.fooding.api.foodtruck.facade.MenuFacade;
import com.fooding.api.foodtruck.service.MenuCommandService;
import com.fooding.api.foodtruck.service.MenuQueryService;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/foodtrucks")
@RestController
public class MenuController {

	private final MenuFacade menuFacade;
	private final MenuQueryService menuQueryService;
	private final MenuCommandService menuCommandService;

	@PostMapping(value = "/{ft-id}/menu", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BaseResponse<?>> registerMenu(
		@PathVariable("ft-id") Long foodTruckId,
		@RequestBody MenuReq req,
		@RequestPart(value = "menuImg", required = false) MultipartFile menuImg) {
		menuFacade.registerMenu(foodTruckId, req, menuImg);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@PatchMapping(value = "/{ft-id}/menu/{menu-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BaseResponse<?>> updateMenu(
		@PathVariable("ft-id") Long foodTruckId,
		@PathVariable("menu-id") Long menuId,
		@RequestBody MenuReq req,
		@RequestPart(value = "menuImg", required = false) MultipartFile menuImg) {
		menuFacade.updateMenu(foodTruckId, menuId, req, menuImg);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@DeleteMapping("/menu/{menu-id}")
	public ResponseEntity<BaseResponse<?>> deleteMenu(@PathVariable("menu-id") Long menuId) {
		menuQueryService.deleteMenu(menuId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@GetMapping("/{ft-id}/menu")
	public ResponseEntity<BaseResponse<List<MenuDto>>> getMenuListForOwner(@PathVariable("ft-id") Long foodTruckId) {
		return ResponseEntity.ok(BaseResponse.ofSuccess(menuCommandService.getMenuListForOwner(foodTruckId)));
	}

}
