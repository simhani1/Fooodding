package com.fooding.api.waitinglog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.waitinglog.domain.WaitingLog;

public interface WaitingLogRepository extends JpaRepository<WaitingLog, Long> {
}
