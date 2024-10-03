package com.fooding.api.fcm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.fcm.domain.FcmToken;
import com.fooding.api.member.domain.MemberRole;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {

	List<FcmToken> findByMemberId(Long memberId);

	List<FcmToken> findByMemberRole(MemberRole role);

}
