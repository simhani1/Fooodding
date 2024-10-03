package com.fooding.api.waiting.repository.custom;

import static com.fooding.api.waiting.domain.QWaiting.*;

import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.member.domain.Member;
import com.fooding.api.waiting.domain.QWaiting;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class WaitingRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public WaitingInfoDto findWaitingInfoByFoodTruck(FoodTruck foodTruck, Member user) {
		QWaiting subWaiting = new QWaiting("subWaiting");
		return queryFactory.select(
				Projections.constructor(WaitingInfoDto.class,
					waiting.id,
					waiting.number,
					JPAExpressions.select(subWaiting.number.count())
						.from(subWaiting)
						.where(subWaiting.foodTruck.eq(waiting.foodTruck)
							.and(subWaiting.id.lt(waiting.id))
							.and(subWaiting.cancellable.isFalse())),
					waiting.cancellable
				)
			)
			.from(waiting)
			.where(waiting.member.eq(user)
				.and(waiting.foodTruck.eq(foodTruck)))
			.fetchOne();
	}

}
