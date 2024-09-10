package com.fooding.api.foodtruck.domain;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoodTruckInfo {

	private String licenseNumber;

	private String name;

	private String introduction;

	private FoodCategory category;

	private String phoneNumber;

	private String snsLink;

}
