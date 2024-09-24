package com.fooding.api.foodtruck.domain.commerce;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommerceInfo {

	@Enumerated(EnumType.STRING)
	private OpenStatus openStatus;

	private LocalDateTime openedAt;

	private LocalDateTime closedAt;

	private Double latitude;

	private Double longitude;

	private CommerceInfo(OpenStatus openStatus, LocalDateTime openedAt, LocalDateTime closedAt, Double latitude, Double longitude) {
		this.openStatus = openStatus;
		this.openedAt = openedAt;
		this.closedAt = closedAt;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public static CommerceInfo ofNew() {
		return new CommerceInfo(OpenStatus.CLOSED, LocalDateTime.now(), LocalDateTime.now(), null, null);
	}

	public static CommerceInfo getOpened(Double latitude, Double longitude) {
		return new CommerceInfo(OpenStatus.OPENED, LocalDateTime.now(), LocalDateTime.now(), latitude, longitude);
	}

	public static CommerceInfo getClosed(CommerceInfo commerceInfo) {
		return new CommerceInfo(OpenStatus.CLOSED, commerceInfo.getOpenedAt(), LocalDateTime.now(), commerceInfo.getLatitude(),
			commerceInfo.getLongitude());
	}

}
