package com.fooding.api.waiting.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import com.fooding.api.foodtruck.domain.FoodTruck;
import com.fooding.api.member.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "waiting")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Waiting {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "waiting_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "foodtruck_id", nullable = false)
	private FoodTruck foodTruck;

	@Column(name = "number", nullable = false)
	private int number;

	@Column(name = "is_cancellable", nullable = false)
	private Boolean cancellable;

	@UpdateTimestamp
	@Column(name = "changed_at", nullable = false)
	private LocalDateTime changedAt;

	private Waiting(Member member, FoodTruck foodTruck, int number, Boolean cancellable) {
		this.member = member;
		this.foodTruck = foodTruck;
		this.number = number;
		this.cancellable = cancellable;
	}

	@Builder
	public Waiting(Member member, FoodTruck foodTruck, int number) {
		this(member, foodTruck, number, false);
	}

	public void changeToOrderLine() {
		this.cancellable = Boolean.FALSE;
	}

}
