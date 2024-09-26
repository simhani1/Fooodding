package com.fooding.api.foodtruck.service;

import java.util.List;

import com.fooding.api.foodtruck.service.dto.CommerceDto;

public interface CommerceQueryService {

	void openFoodTruck(Long foodTruckId, CommerceDto commerceDto, List<Long> unsoldMenuId);

	void closeFoodTruck(Long foodTruckId);

}
