package com.fooding.api.fcm.domain;

import com.fooding.api.member.domain.Member;

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
@Table(name = "fcmtoken")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FcmToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notification_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "notification_token", nullable = false)
	private String token;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "status", nullable = false)
	private TokenStatus status;

	@Builder
	public FcmToken(Member member, String token) {
		this(member, token, TokenStatus.ACTIVE);
	}

	private FcmToken(Member member, String token, TokenStatus status) {
		this.member = member;
		this.token = token;
		this.status = status;
	}

	public void changeStatus() {
		if (this.status == TokenStatus.ACTIVE) {
			this.status = TokenStatus.INACTIVE;
		} else {
			this.status = TokenStatus.ACTIVE;
		}
	}

}
