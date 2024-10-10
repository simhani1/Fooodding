package com.fooding.api.waitinglog.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fooding.api.foodtruck.domain.FoodTruck;

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

@Entity
@Getter
@Table(name = "waiting_log")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WaitingLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "waiting_log_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "foodtruck_id", nullable = false)
	private FoodTruck foodTruck;

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "ages", nullable = false)
	private String ages;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder
	public WaitingLog(FoodTruck foodTruck, String gender, String ages) {
		this.foodTruck = foodTruck;
		this.gender = gender;
		this.ages = ages;
	}

}
