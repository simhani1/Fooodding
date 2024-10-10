package com.fooding.api.foodtruck.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.locationtech.jts.geom.Point;

import com.fooding.api.foodtruck.domain.commerce.CommerceInfo;
import com.fooding.api.foodtruck.domain.commerce.OpenStatus;
import com.fooding.api.foodtruck.domain.menu.Menu;
import com.fooding.api.member.domain.Member;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "foodtruck")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoodTruck {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "foodtruck_id")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Embedded
	@AttributeOverride(name = "licenseNumber", column = @Column(name = "license_number", nullable = false))
	@AttributeOverride(name = "name", column = @Column(name = "name", nullable = false))
	@AttributeOverride(name = "introduction", column = @Column(name = "introduction"))
	@AttributeOverride(name = "category", column = @Column(name = "category", nullable = false))
	private FoodTruckInfo info;

	@OneToMany(mappedBy = "foodTruck")
	private final List<Menu> menuList = new ArrayList<>();

	@Embedded
	@AttributeOverride(name = "openStatus", column = @Column(name = "open_status", nullable = false))
	@AttributeOverride(name = "openedAt", column = @Column(name = "opened_at", nullable = false))
	@AttributeOverride(name = "closedAt", column = @Column(name = "closed_at", nullable = false))
	@AttributeOverride(name = "location", column = @Column(name = "location", columnDefinition = "POINT SRID 4326", nullable = false))
	@AttributeOverride(name = "waitingNumber", column = @Column(name = "waiting_number"))
	private CommerceInfo commerceInfo;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder
	public FoodTruck(Member member, FoodTruckInfo info, CommerceInfo commerceInfo) {
		this.member = member;
		this.info = info;
		this.commerceInfo = commerceInfo;
	}

	public void open(Point location, List<Long> unsoldMenuId) {
		if (unsoldMenuId != null && !unsoldMenuId.isEmpty()) {
			this.menuList.stream()
				.filter(menu -> unsoldMenuId.contains(menu.getId()))
				.forEach(Menu::disableSale);
		}
		this.commerceInfo = CommerceInfo.getOpened(location);
	}

	public void close() {
		this.menuList.forEach(Menu::enableSale);
		this.commerceInfo = CommerceInfo.getClosed(this.commerceInfo);
	}

	public void updateInfo(FoodTruckInfo info) {
		this.info = info;
	}

	public boolean isOpened() {
		return this.commerceInfo.getOpenStatus().equals(OpenStatus.OPENED);
	}

	public boolean isClosed() {
		return this.commerceInfo.getOpenStatus().equals(OpenStatus.CLOSED);
	}

	public int nextWaitingNumber() {
		int waitingNumber = this.commerceInfo.getWaitingNumber();
		this.commerceInfo.plusWaitingNumber();
		return waitingNumber;
	}

}
