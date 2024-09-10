package com.fooding.api.foodtruck.domain.menu;

import com.fooding.api.foodtruck.domain.FoodTruck;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "menu")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "price", nullable = false)
	private int price;

	@Column(name = "img")
	private String img;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "type", nullable = false)
	private MenuType type;

	@Column(name = "is_on_sale", nullable = false)
	private boolean onSale;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "foodtruck_id")
	private FoodTruck foodTruck;

	@Builder
	public Menu(String name, int price, String img, MenuType type, FoodTruck foodTruck) {
		this(name, price, img, type, true, foodTruck);
	}

	public Menu(String name, int price, String img, MenuType type, boolean onSale, FoodTruck foodTruck) {
		this.name = name;
		this.price = price;
		this.img = img;
		this.type = type;
		this.onSale = onSale;
		setFoodTruck(foodTruck);
	}

	private void setFoodTruck(FoodTruck foodTruck) {
		this.foodTruck = foodTruck;
		foodTruck.getMenuList().add(this);
	}

}
