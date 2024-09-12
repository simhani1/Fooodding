package com.fooding.api.foodtruck.repository.custom;

import static com.fooding.api.foodtruck.domain.QFoodTruck.*;

import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.owner.domain.Owner;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FoodTruckRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public FoodTruck findByOwner(Owner owner) {
		return queryFactory
			.selectFrom(foodTruck)
			.where(foodTruck.owner.eq(owner))
			.fetchOne();
	}

}
