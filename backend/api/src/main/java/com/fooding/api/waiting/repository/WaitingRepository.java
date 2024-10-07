package com.fooding.api.waiting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.member.domain.Member;
import com.fooding.api.waiting.domain.Waiting;

public interface WaitingRepository extends JpaRepository<Waiting, Long> {

	Optional<Waiting> findByIdAndMember(Long waitingId, Member member);

	@Query("select w from Waiting w where w.foodTruck = :foodTruck order by w.id asc")
	List<Waiting> findByFoodTruck(FoodTruck foodTruck);

}
