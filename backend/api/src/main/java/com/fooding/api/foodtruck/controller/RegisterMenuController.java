package com.fooding.api.foodtruck.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.controller.request.MenuReq;
import com.fooding.api.foodtruck.service.RegisterMenuService;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RegisterMenuController extends FoodTruckController {

	private final RegisterMenuService registerMenuService;

	@PostMapping(value = "/menu", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BaseResponse<?>> registerMenu(
		@RequestPart("menu") MenuReq req,
		@RequestPart("image") MultipartFile img) {
		String imageUrl = uploadImageToS3(img);
		registerMenuService.registerMenu(1L, MenuDto.builder()
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
