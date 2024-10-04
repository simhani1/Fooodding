package com.fooding.api.foodtruck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.foodtruck.domain.FoodTruck;

public interface FoodTruckRepository extends JpaRepository<FoodTruck, Long> {

	List<FoodTruck> findAllByOpened();

}
