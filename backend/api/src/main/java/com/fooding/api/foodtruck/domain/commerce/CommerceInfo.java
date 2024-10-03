package com.fooding.api.foodtruck.domain.commerce;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommerceInfo {

	@Transient
	private static final int INITIAL_WAITING_NUMBER = 100;

	@Transient
	private static final int LAST_WAITING_NUMBER = 999;

	@Enumerated(EnumType.STRING)
	private OpenStatus openStatus;

	private LocalDateTime openedAt;

	private LocalDateTime closedAt;

	private Double latitude;

	private Double longitude;

	private Integer waitingNumber;

	private CommerceInfo(OpenStatus openStatus, LocalDateTime openedAt, LocalDateTime closedAt, Double latitude,
		Double longitude, Integer waitingNumber) {
		this.openStatus = openStatus;
		this.openedAt = openedAt;
		this.closedAt = closedAt;
		this.latitude = latitude;
		this.longitude = longitude;
		this.waitingNumber = waitingNumber;
	}

	public static CommerceInfo ofNew() {
		return new CommerceInfo(OpenStatus.CLOSED, LocalDateTime.now(), LocalDateTime.now(), null, null, null);
	}

	public static CommerceInfo getOpened(Double latitude, Double longitude) {
		return new CommerceInfo(OpenStatus.OPENED, LocalDateTime.now(), LocalDateTime.now(), latitude, longitude,
			INITIAL_WAITING_NUMBER);
	}

	public static CommerceInfo getClosed(CommerceInfo commerceInfo) {
		return new CommerceInfo(OpenStatus.CLOSED, commerceInfo.getOpenedAt(), LocalDateTime.now(),
			commerceInfo.getLatitude(),
			commerceInfo.getLongitude(),
			null);
	}

	public void plusWaitingNumber() {
		if (this.waitingNumber == LAST_WAITING_NUMBER) {
			this.waitingNumber = INITIAL_WAITING_NUMBER;
		} else {
			this.waitingNumber++;
		}
	}

}
