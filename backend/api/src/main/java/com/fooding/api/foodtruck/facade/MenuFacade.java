package com.fooding.api.foodtruck.facade;

import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fooding.api.foodtruck.controller.request.MenuReq;
import com.fooding.api.foodtruck.service.MenuQueryService;
import com.fooding.api.foodtruck.service.UploadMenuImgHelper;
import com.fooding.api.foodtruck.service.dto.MenuDto;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Component
public class MenuFacade {

	private final UploadMenuImgHelper uploadMenuImgHelper;
	private final MenuQueryService menuQueryService;
	private final StringHttpMessageConverter stringHttpMessageConverter;

	public void registerMenu(Long foodTruckId, MenuReq req, MultipartFile menuImg) {
		String imgUrl = getImgUrl(menuImg);
		menuQueryService.registerMenu(foodTruckId, MenuDto.builder()
			.name(req.name())
			.price(req.price())
			.img(imgUrl)
			.build());
	}

	public void updateMenu(Long foodTruckId, Long menuId, MenuReq req, MultipartFile menuImg) {
		String imgUrl = getImgUrl(menuImg);
		menuQueryService.updateMenu(foodTruckId, menuId, MenuDto.builder()
			.name(req.name())
			.price(req.price())
			.img(imgUrl)
			.build());
	}

	private String getImgUrl(MultipartFile menuImg) {
		String imgUrl = null;
		if (!menuImg.isEmpty()) {
			imgUrl = uploadMenuImgHelper.uploadMenuImg(menuImg);
		}
		return imgUrl;
	}

}
