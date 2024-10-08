package com.fooding.api.foodtruck.domain.commerce;

import java.time.LocalDateTime;

import org.locationtech.jts.geom.Point;

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
	private Point location;
	private Integer waitingNumber;

	private CommerceInfo(OpenStatus openStatus, LocalDateTime openedAt, LocalDateTime closedAt, Point location,
		Integer waitingNumber) {
		this.openStatus = openStatus;
		this.openedAt = openedAt;
		this.closedAt = closedAt;
		this.location = location;
		this.waitingNumber = waitingNumber;
	}

	public static CommerceInfo ofNew() {
		return new CommerceInfo(OpenStatus.CLOSED, LocalDateTime.now(), LocalDateTime.now(), null, null);
	}

	public static CommerceInfo getOpened(Point location) {
		return new CommerceInfo(OpenStatus.OPENED, LocalDateTime.now(), LocalDateTime.now(), location,
			INITIAL_WAITING_NUMBER);
	}

	public static CommerceInfo getClosed(CommerceInfo commerceInfo) {
		return new CommerceInfo(OpenStatus.CLOSED, commerceInfo.getOpenedAt(), LocalDateTime.now(),
			commerceInfo.getLocation(),
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
