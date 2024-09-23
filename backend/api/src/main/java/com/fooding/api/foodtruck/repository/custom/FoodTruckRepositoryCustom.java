package com.fooding.api.foodtruck.repository.custom;

import static com.fooding.api.foodtruck.domain.QFoodTruck.*;

import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.member.domain.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FoodTruckRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public FoodTruck findByOwner(Member owner) {
		return queryFactory
			.selectFrom(foodTruck)
			.where(foodTruck.member.eq(owner))
			.fetchOne();
	}

}
