package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.MenuDto;

public interface MenuQueryService {

	void registerMenu(MenuDto dto);

	void updateMenu(Long menuId, MenuDto dto);

	void deleteMenu(Long menuId);
}
