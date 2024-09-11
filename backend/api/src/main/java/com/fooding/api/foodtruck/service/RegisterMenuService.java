package com.fooding.api.foodtruck.service;

import com.fooding.api.foodtruck.service.dto.MenuDto;

public interface RegisterMenuService {

	void registerMenu(Long foodTruckId,  MenuDto dto);

}
