package com.fooding.api.foodtruck.domain;

import com.fooding.api.foodtruck.exception.FoodTruckIntroductionOverflowException;
import com.fooding.api.foodtruck.exception.FoodTruckNameOverflowException;
import com.fooding.api.foodtruck.exception.IllegalFoodTruckNameException;
import com.fooding.api.foodtruck.exception.IllegalLicenseNumberException;
import com.fooding.api.foodtruck.exception.LicenseNumberOverflowException;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoodTruckInfo {

	private String licenseNumber;

	private String name;

	private String introduction;

	@Enumerated(EnumType.STRING)
	private FoodCategory category;

	@Builder
	public FoodTruckInfo(String licenseNumber, String name, String introduction, FoodCategory category) {
		checkLicenseNumber(licenseNumber);
		checkName(name);
		checkIntroduction(introduction);
		this.licenseNumber = licenseNumber;
		this.name = name;
		this.introduction = introduction;
		this.category = category;
	}

	private void checkLicenseNumber(String licenseNumber) {
		if (licenseNumber == null || licenseNumber.trim().isEmpty()) {
			throw new IllegalLicenseNumberException("LicenseNumber cannot be null");
		}
		if (licenseNumber.length() > 10) {
			throw new LicenseNumberOverflowException("Invalid LicenseNumber value");
		}
	}

	private void checkName(String name) {
		if (name == null || name.trim().isEmpty()) {
			throw new IllegalFoodTruckNameException("Name cannot be null");
		}
		if (name.length() > 10) {
			throw new FoodTruckNameOverflowException("Invalid name value");
		}
	}

	private void checkIntroduction(String introduction) {
		if (name != null && name.length() > 20) {
			throw new FoodTruckIntroductionOverflowException("Invalid introduction value");
		}
	}

}
