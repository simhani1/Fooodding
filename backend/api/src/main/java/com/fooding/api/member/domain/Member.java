package com.fooding.api.member.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLRestriction;

import com.fooding.api.member.exception.AlreadyInactiveException;

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
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("status = 'ACTIVE'")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "nickname", nullable = false)
	private String nickname;

	@Column(name = "gender")
	private String gender;

	@Column(name = "ages")
	private String ages;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "provider", nullable = false)
	private Provider provider;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "status", nullable = false)
	private MemberStatus status;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "role", nullable = false)
	private MemberRole role;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder
	public Member(String nickname, String email, Provider provider, MemberRole role) {
		this(nickname, email, null, null, provider, MemberStatus.ACTIVE, role);
	}

	private Member(String nickname, String email, String gender, String ages, Provider provider, MemberStatus status,
		MemberRole role) {
		this.nickname = nickname;
		this.email = email;
		this.gender = gender;
		this.ages = ages;
		this.provider = provider;
		this.status = status;
		this.role = role;
	}

	public void inactive() {
		if (alreadyInactive()) {
			throw new AlreadyInactiveException();
		}
		this.status = MemberStatus.INACTIVE;
	}

	private boolean alreadyInactive() {
		return this.status.equals(MemberStatus.INACTIVE);
	}

}
