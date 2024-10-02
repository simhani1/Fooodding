package com.fooding.api.announcement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.announcement.domain.AnnouncementLog;

public interface AnnouncementLogRepository extends JpaRepository<AnnouncementLog, Long> {

}
