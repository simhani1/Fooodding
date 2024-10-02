package com.fooding.api.announcement.repository.custom;

import static com.fooding.api.announcement.domain.QAnnouncement.*;
import static com.fooding.api.announcement.domain.QAnnouncementLog.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.fooding.api.announcement.domain.Announcement;
import com.fooding.api.announcement.service.dto.AnnouncementDto;
import com.fooding.api.member.domain.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class AnnouncementRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public List<AnnouncementDto> findAnnouncementsByMember(Member member) {
		List<Announcement> openedAnnouncements = queryFactory.select(announcement)
			.from(announcement)
			.leftJoin(announcementLog)
			.on(announcement.eq(announcementLog.announcement))
			.where(announcementLog.member.eq(member))
			.fetch();

		List<Announcement> allAnnouncements = queryFactory.selectFrom(announcement)
			.fetch();

		return allAnnouncements.stream().map(announcement -> {
			boolean isOpened = openedAnnouncements.contains(announcement);
			return AnnouncementDto.builder()
				.announcementId(announcement.getId())
				.url(announcement.getUrl())
				.title(announcement.getTitle())
				.date(announcement.getDate())
				.time(announcement.getTime())
				.place(announcement.getPlace())
				.opened(isOpened)
				.build();
		}).collect(Collectors.toList());
	}

	public boolean logExists(Member member, Announcement announcement) {
		return queryFactory
			.selectFrom(announcementLog)
			.where(
				announcementLog.member.eq(member)
					.and(announcementLog.announcement.eq(announcement))
			)
			.fetchFirst() != null; //있으면 바로 끝
	}

}
