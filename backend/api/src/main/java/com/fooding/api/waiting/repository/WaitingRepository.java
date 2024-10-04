package com.fooding.api.waiting.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.member.domain.Member;
import com.fooding.api.waiting.domain.Waiting;

public interface WaitingRepository extends JpaRepository<Waiting, Long> {

	Optional<Waiting> findByIdAndMember(Long waitingId, Member member);

}
