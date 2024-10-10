package com.fooding.api.announcement.repository.custom;

import org.springframework.stereotype.Repository;

import com.fooding.api.announcement.domain.Announcement;
import com.fooding.api.announcement.domain.QAnnouncementLog;
import com.fooding.api.member.domain.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class AnnouncementLogRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public boolean logExists(Member member, Announcement announcement) {
		QAnnouncementLog announcementLog = QAnnouncementLog.announcementLog;

		return queryFactory
			.selectFrom(announcementLog)
			.where(
				announcementLog.member.eq(member)
					.and(announcementLog.announcement.eq(announcement))
			)
			.fetchFirst() != null;
	}
}
