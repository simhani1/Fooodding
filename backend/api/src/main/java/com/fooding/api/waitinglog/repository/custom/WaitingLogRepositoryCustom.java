package com.fooding.api.waitinglog.repository.custom;

import static com.fooding.api.waitinglog.domain.QWaitingLog.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.waitinglog.domain.WaitingLog;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class WaitingLogRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public List<WaitingLog> findWaitingLogsByFoodTruck(FoodTruck foodTruck) {
		return queryFactory
			.selectFrom(waitingLog)
			.where(waitingLog.foodTruck.eq(foodTruck))
			.orderBy(waitingLog.createdAt.desc())
			.fetch();
	}
}

