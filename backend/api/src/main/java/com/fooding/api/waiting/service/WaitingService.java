package com.fooding.api.waiting.service;

import com.fooding.api.fcm.service.FcmMessageService;
import com.fooding.api.fcm.util.FcmMessageFactory;
import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.repository.FoodTruckRepository;
import com.fooding.api.foodtruck.repository.custom.FoodTruckRepositoryCustom;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import com.fooding.api.notification.service.NotificationService;
import com.fooding.api.waiting.domain.Waiting;
import com.fooding.api.waiting.event.WaitingChangedEvent;
import com.fooding.api.waiting.exception.CannotCancelWaitingException;
import com.fooding.api.waiting.exception.NoWaitingInfoException;
import com.fooding.api.waiting.repository.WaitingRepository;
import com.fooding.api.waiting.service.dto.UserWaitingInfoDto;
import com.fooding.api.waiting.service.dto.WaitingInfoDto;
import com.fooding.api.waitinglog.domain.WaitingLog;
import com.fooding.api.waitinglog.repository.WaitingLogRepository;
import com.google.firebase.messaging.FirebaseMessagingException;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class WaitingService {

	private final NotificationService notificationService;
	private final MemberRepository memberRepository;
	private final FoodTruckRepository foodTruckRepository;
	private final WaitingRepository waitingRepository;
	private final FcmMessageService fcmMessageService;
	private final FoodTruckRepositoryCustom foodTruckRepositoryCustom;
	private final ApplicationEventPublisher eventPublisher;
	private final WaitingLogRepository waitingLogRepository;

	public List<WaitingInfoDto> getReservationList(Long ownerId, Long foodTruckId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		List<Waiting> waitingList = waitingRepository.findByFoodTruck(foodTruck);
		return waitingList.stream()
			.map(waiting -> WaitingInfoDto.builder()
				.waitingId(waiting.getId())
				.changedAt(waiting.getChangedAt().toInstant(ZoneOffset.UTC).toEpochMilli())
				.cancelable(waiting.isCancellable())
				.number(waiting.getNumber())
				.userName(waiting.getMember().getNickname())
				.build())
			.collect(Collectors.toList());
	}

	public List<UserWaitingInfoDto> getUserReservationList(Long userId) {
		Member user  =memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("User not found with ID: " + userId));
		List<Waiting> waitingList = waitingRepository.findByMember(user);
		return waitingList.stream()
			.map(waiting -> UserWaitingInfoDto.builder()
				.waitingId(waiting.getId())
				.number(waiting.getNumber())
				.foodTruckId(waiting.getFoodTruck().getId())
				.foodTruckName(waiting.getFoodTruck().getInfo().getName())
				.build())
			.collect(Collectors.toList());
	}

	public WaitingInfoDto reserve(Long userId, Long foodTruckId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		FoodTruck foodTruck = foodTruckRepository.findById(foodTruckId)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found with ID: " + foodTruckId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		int waitingNumber = foodTruck.nextWaitingNumber();
		Waiting waiting = Waiting.builder()
			.member(user)
			.foodTruck(foodTruck)
			.number(waitingNumber)
			.build();
		waitingRepository.save(waiting);
		WaitingInfoDto info = WaitingInfoDto.builder()
			.waitingId(waiting.getId())
			.changedAt(waiting.getChangedAt().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
			.cancelable(waiting.isCancellable())
			.userName(user.getNickname())
			.number(waiting.getNumber())
			.build();
		eventPublisher.publishEvent(new WaitingChangedEvent(foodTruckId, "reserved", info));
		return info;
	}

	public void cancel(Long userId, Long waitingId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new NoMemberException("Member not found with ID: " + userId));
		Waiting waiting = waitingRepository.findByIdAndMember(waitingId, user)
			.orElseThrow(() -> new NoWaitingInfoException("Waiting not found with ID: " + waitingId));
		if (!waiting.isCancellable()) {
			throw new CannotCancelWaitingException("Cannot cancel waiting");
		}
		waitingRepository.deleteById(waitingId);
		eventPublisher.publishEvent(new WaitingChangedEvent(waiting.getFoodTruck().getId(), "canceled",
			WaitingInfoDto.builder().waitingId(waitingId).build()));
	}

	public WaitingInfoDto changeToOrderLine(Long ownerId, Long waitingId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		Waiting waiting = waitingRepository.findById(waitingId)
			.orElseThrow(() -> new NoWaitingInfoException("Waiting not found with ID: " + waitingId));
		waiting.changeToOrderLine();
		try {
			fcmMessageService.sendMessages(waiting.getMember().getId(), FcmMessageFactory.createCustomerTurnMessage());
		} catch (FirebaseMessagingException e) {
			log.error("Error while sending FCM message", e);
		}
		return WaitingInfoDto.builder()
			.waitingId(waiting.getId())
			.changedAt(waiting.getChangedAt().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
			.cancelable(waiting.isCancellable())
			.number(waiting.getNumber())
			.build();
	}

	public void completeUser(Long ownerId, Long waitingId, boolean isCompleted) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		Waiting waiting = waitingRepository.findById(waitingId)
			.orElseThrow(() -> new NoWaitingInfoException("Waiting not found with ID: " + waitingId));
		FoodTruck foodTruck = foodTruckRepositoryCustom.findByOwner(owner)
			.orElseThrow(() -> new NoFoodTruckException("FoodTruck not found by ownerID: " + ownerId));
		if (foodTruck.isClosed()) {
			throw new FoodTruckAlreadyClosedException("FoodTruck is already closed");
		}
		if (isCompleted) {
			waitingLogRepository.save(
				WaitingLog.builder()
					.foodTruck(foodTruck)
					.gender(waiting.getMember().getGender())
					.ages(waiting.getMember().getAges())
					.build()
			);
		}
		waitingRepository.deleteById(waitingId);
	}

}
