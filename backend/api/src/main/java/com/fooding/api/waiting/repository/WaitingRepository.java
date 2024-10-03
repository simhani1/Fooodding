package com.fooding.api.waiting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.waiting.domain.Waiting;

public interface WaitingRepository extends JpaRepository<Waiting, Long> {
}
