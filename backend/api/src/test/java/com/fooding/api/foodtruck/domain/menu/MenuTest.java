package com.fooding.api.foodtruck.domain.menu;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fooding.api.foodtruck.domain.FoodCategory;
import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.foodtruck.domain.FoodTruckInfo;
import com.fooding.api.foodtruck.exception.IllegalMenuNameException;
import com.fooding.api.foodtruck.exception.IllegalMenuPriceException;
import com.fooding.api.foodtruck.exception.MenuNameOverFlowException;
import com.fooding.api.owner.domain.Owner;

@ExtendWith(MockitoExtension.class)
class MenuTest {

	@Mock
	private Owner owner;

	private FoodTruck foodTruck;
	private FoodTruckInfo foodTruckInfo;

	@BeforeEach
	void setUp() {
		foodTruckInfo = new FoodTruckInfo(
			"R5A13224",
			"매운종한닭꼬치",
			"둘이 먹다 하나가 죽는 매운맛",
			FoodCategory.KOREAN
		);

		// FoodTruck의 새로운 생성자에 맞게 설정
		foodTruck = FoodTruck.builder()
			.owner(owner)
			.info(foodTruckInfo)
			.build();
	}

	@DisplayName("메뉴 생성 성공")
	@Test
	void createMenuSuccess() {
		assertDoesNotThrow(() -> new Menu("종한이의 닭꼬치", 5000, "chicken_skewer.jpg", foodTruck));
	}

	@DisplayName("메뉴 업데이트 성공")
	@Test
	void updateMenuSuccess() {
		// given
		Menu menu = new Menu("종한이의 닭꼬치", 5000, "chicken_skewer.jpg", foodTruck);

		// when & then
		assertDoesNotThrow(() -> menu.update("새로운 닭꼬치", 6000, "new_chicken_skewer.jpg"));
		assertEquals("새로운 닭꼬치", menu.getName());
		assertEquals(6000, menu.getPrice());
		assertEquals("new_chicken_skewer.jpg", menu.getImg());
	}

	@DisplayName("메뉴 업데이트 시 이름이 null일 때 IllegalMenuNameException 발생")
	@Test
	void updateMenuWithNullName() {
		//given
		Menu menu = new Menu("종한이의 닭꼬치", 5000, "chicken_skewer.jpg", foodTruck);

		// when & then
		assertThrows(IllegalMenuNameException.class, () -> menu.update(null, 6000, "new_chicken_skewer.jpg"));
	}

	@DisplayName("메뉴 업데이트 시 이름이 비어있거나 15자를 초과할 때 MenuNameOverFlowException 발생")
	@ParameterizedTest
	@ValueSource(strings = {"", "   ", "ThisNameIsWayTooLongForAMenu"})
	void updateMenuWithInvalidName(String invalidName) {
		// given
		Menu menu = new Menu("종한이의 닭꼬치", 5000, "chicken_skewer.jpg", foodTruck);

		// when & then
		assertThrows(MenuNameOverFlowException.class, () -> menu.update(invalidName, 6000, "new_chicken_skewer.jpg"));
	}

	@DisplayName("메뉴 업데이트 시 가격이 유효하지 않을 때 IllegalMenuPriceException 발생")
	@ParameterizedTest
	@ValueSource(ints = {-1, 10000000})
	void updateMenuWithInvalidPrice(int invalidPrice) {
		// given
		Menu menu = new Menu("종한이의 닭꼬치", 5000, "chicken_skewer.jpg", foodTruck);

		// when & then
		assertThrows(
			IllegalMenuPriceException.class, () -> menu.update("새로운 닭꼬치", invalidPrice, "new_chicken_skewer.jpg"));
	}

}
