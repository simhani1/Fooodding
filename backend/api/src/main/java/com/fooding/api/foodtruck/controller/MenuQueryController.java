package com.fooding.api.foodtruck.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.MenuReq;
import com.fooding.api.foodtruck.service.MenuQueryService;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MenuQueryController extends FoodTruckController {

	private final MenuQueryService menuQueryService;

	@PostMapping(value = "/menu", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BaseResponse<?>> registerMenu(
		@RequestPart("menu") MenuReq req,
		@RequestPart("image") MultipartFile img) {
		String imageUrl = uploadImageToS3(img);
		menuQueryService.registerMenu(1L, MenuDto.builder()
			.name(req.name())
			.price(req.price())
			.img(imageUrl)
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@PatchMapping(value = "/menu/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BaseResponse<?>> updateMenu(
		@RequestPart("menuId") Long menuId,
		@RequestPart("menu") MenuReq req,
		@RequestPart(value = "image", required = false) MultipartFile img) {

		// 이미지가 제공되면 업로드, 제공되지 않으면 업로드 안함
		String imageUrl = (img != null) ? uploadImageToS3(img) : null;

		menuQueryService.updateMenu(menuId, MenuDto.builder()
			.name(req.name())
			.price(req.price())
			.img(imageUrl)
			.build());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	private String uploadImageToS3(MultipartFile img) {

		return "image-url";
	}


}
