package com.fooding.api.owner.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "owner")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "owner_id")
	private Long id;

	@Column(name = "nickname", nullable = false)
	private String nickname;

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "ages", nullable = false)
	private String ages;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "provider", nullable = false)
	private Provider provider;

	@Column(name = "status", nullable = false)
	private MemberStatus status;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder
	public Owner(String nickname, String gender, String ages, Provider provider) {
		this(nickname, gender, ages, provider, MemberStatus.ACTIVE);
	}

	private Owner(String nickname, String gender, String ages, Provider provider, MemberStatus status) {
		this.nickname = nickname;
		this.gender = gender;
		this.ages = ages;
		this.provider = provider;
		this.status = status;
	}

}
