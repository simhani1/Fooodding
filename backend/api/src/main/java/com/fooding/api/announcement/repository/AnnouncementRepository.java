package com.fooding.api.announcement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.announcement.domain.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

	boolean existsByUrl(String url);

}
