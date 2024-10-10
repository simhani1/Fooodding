package com.fooding.api.announcement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.announcement.domain.AnnouncementLog;
import com.fooding.api.member.domain.Member;

public interface AnnouncementLogRepository extends JpaRepository<AnnouncementLog, Long> {

	List<AnnouncementLog> findByMember(Member member);

}
