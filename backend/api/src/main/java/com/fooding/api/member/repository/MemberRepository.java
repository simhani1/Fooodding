package com.fooding.api.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.member.domain.Member;
import com.fooding.api.member.domain.Provider;
import com.fooding.api.member.domain.MemberRole;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByEmailAndProviderAndRole (String email, Provider provider, MemberRole role);

}
