package com.fooding.api.waitinglog.service.impl;

import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.waitinglog.domain.WaitingLog;
import com.fooding.api.waitinglog.repository.custom.WaitingLogRepositoryCustom;
import com.fooding.api.waitinglog.service.WaitingLogCommandService;
import com.fooding.api.waitinglog.service.dto.WaitingTimeLogDto;
import com.fooding.api.waitinglog.service.dto.WaitingUserLogDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
class WaitingLogCommandServiceImpl implements WaitingLogCommandService {

	private final MemberRepository memberRepository;
	private final WaitingLogRepositoryCustom waitingLogRepository;
	private final FoodTruckRepositoryCustom foodTruckRepository;

	@Override
	public List<WaitingTimeLogDto> getWaitingTimeLog(Long ownerId){
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepository.findByOwner(owner)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ownerID: " + ownerId));

		List<WaitingLog> waitingLogs = waitingLogRepository.findWaitingLogsByFoodTruck(foodTruck);

		return waitingLogs.stream()
			.collect(Collectors.groupingBy(log ->
				Map.entry(
					log.getCreatedAt().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN), // 요일
					log.getCreatedAt().getHour() // 시간대
				), Collectors.counting()
			))
			.entrySet()
			.stream()
			.map(entry -> WaitingTimeLogDto.builder()
				.dayOfWeek(entry.getKey().getKey())  // 요일
				.time(entry.getKey().getValue() + "시")  // 시간대
				.count(entry.getValue())  // 대기 인원 수
				.build())
			.collect(Collectors.toList());
	}

	@Override
	public List<WaitingUserLogDto> getWaitingUserLog(Long ownerId){
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepository.findByOwner(owner)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ownerID: " + ownerId));

		List<WaitingLog> waitingLogs = waitingLogRepository.findWaitingLogsByFoodTruck(foodTruck);

		return waitingLogs.stream()
			.collect(Collectors.groupingBy(log ->
				Map.entry(log.getGender(), log.getAges()), Collectors.counting()
			))
			.entrySet()
			.stream()
			.map(entry -> WaitingUserLogDto.builder()
				.gender(entry.getKey().getKey())
				.ages(entry.getKey().getValue())  // 나이대
				.count(entry.getValue())  // 대기 인원 수
				.build())
			.collect(Collectors.toList());
	}
}
