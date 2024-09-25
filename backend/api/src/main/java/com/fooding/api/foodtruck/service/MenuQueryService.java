package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.MenuDto;

public interface MenuQueryService {

	void registerMenu(Long memberId, MenuDto dto);

	void updateMenu(Long foodTruckId, Long menuId, MenuDto dto);

	void deleteMenu(Long menuId);
}
