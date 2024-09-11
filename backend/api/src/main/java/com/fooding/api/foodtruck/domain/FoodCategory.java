package com.fooding.api.foodtruck.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum FoodCategory {

	KOREAN("한식"),
	JAPANESE("양식"),
	CHINESE("중식"),
	WESTERN("양식"),
	BUNSIK("분식"),
	ASIAN("아시안"),
	FAST_FOOD("패스트푸드"),
	CAFE_DESSERT("카페/디저트"),
	;

	private String name;

}
