package com.fooding.api.foodtruck.repository.custom;

import static com.fooding.api.foodtruck.domain.menu.QMenu.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.QFoodTruck;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class MenuRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public List<Menu> findMenuListJoinWithFoodTruck(FoodTruck foodTruck) {
		return queryFactory.selectFrom(menu)
			.leftJoin(menu.foodTruck, QFoodTruck.foodTruck)
			.where(menu.foodTruck.eq(foodTruck))
			.fetch();
	}

}
