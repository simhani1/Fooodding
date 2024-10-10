package com.fooding.api.foodtruck.repository.custom;

import static com.fooding.api.foodtruck.domain.QFoodTruck.*;

import java.util.List;
import java.util.Optional;

import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.commerce.OpenStatus;
import com.fooding.api.member.domain.Member;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FoodTruckRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public Optional<FoodTruck> findByOwner(Member owner) {
		return Optional.ofNullable(queryFactory
			.selectFrom(foodTruck)
			.where(foodTruck.member.eq(owner))
			.fetchOne());
	}

	public List<FoodTruck> findOpenedFoodTrucks(Point center, Long lastFoodTruckId) {
		return queryFactory.selectFrom(foodTruck)
			.where(foodTruck.commerceInfo.openStatus.eq(OpenStatus.OPENED)
				.and(Expressions.booleanTemplate(
					"ST_Contains(ST_Buffer({0}, {1}), {2})",
					center, 1000, foodTruck.commerceInfo.location))
				.and(foodTruck.id.lt(lastFoodTruckId)))
			.orderBy(foodTruck.id.desc())
			.limit(20)
			.fetch();
	}

}
