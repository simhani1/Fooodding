package com.fooding.api.foodtruck.service;

import java.util.List;

import com.fooding.api.foodtruck.service.dto.MenuDto;

public interface MenuCommandService {

	List<MenuDto> getMenuListForOwner(Long foodTruckId);

}
