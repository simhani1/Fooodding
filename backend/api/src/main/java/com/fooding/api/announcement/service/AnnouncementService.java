package com.fooding.api.announcement.service;

import com.fooding.api.announcement.domain.Announcement;
import com.fooding.api.announcement.domain.AnnouncementLog;
import com.fooding.api.announcement.exception.NoAnnouncementException;
import com.fooding.api.announcement.repository.AnnouncementLogRepository;
import com.fooding.api.announcement.repository.AnnouncementRepository;
import com.fooding.api.announcement.repository.custom.AnnouncementLogRepositoryCustom;
import com.fooding.api.announcement.service.dto.AnnouncementDto;
import com.fooding.api.announcement.service.dto.AnnouncementLogDto;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AnnouncementService {

	private final MemberRepository memberRepository;
	private final AnnouncementRepository announcementRepository;
	private final AnnouncementLogRepository announcementLogRepository;
	private final AnnouncementLogRepositoryCustom announcementLogRepositoryCustom;

	public List<AnnouncementDto> getAnnouncementByOwner(Long ownerId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));
		List<Announcement> announcements = announcementRepository.findAll();
		List<AnnouncementLog> announcementLogs = announcementLogRepository.findByMember(owner);

		Set<Long> openedAnnouncementIds = announcementLogs.stream()
			.map(log -> log.getAnnouncement().getId())
			.collect(Collectors.toSet());

		return announcements.stream()
			.map(announcement -> {
				boolean isOpened = openedAnnouncementIds.contains(announcement.getId());
				return AnnouncementDto.builder()
					.announcementId(announcement.getId())
					.url(announcement.getUrl())
					.title(announcement.getTitle())
					.date(announcement.getDate())
					.time(announcement.getTime())
					.place(announcement.getPlace())
					.opened(isOpened)
					.build();
			})
			.collect(Collectors.toList());
	}

	@Transactional
	public void saveAnnouncementLog(AnnouncementLogDto announcementLogDto) {
		Member member = memberRepository.findById(announcementLogDto.memberId())
			.orElseThrow(() -> new NoMemberException("Owner not found with ID:" + announcementLogDto.memberId()));

		Announcement announcement = announcementRepository.findById(announcementLogDto.announcementId())
			.orElseThrow(() -> new NoAnnouncementException(
				"Announcement not found with ID: " + announcementLogDto.announcementId()));

		boolean logExists = announcementLogRepositoryCustom.logExists(member, announcement);

		if (!logExists) {  // 관련 로그 존재하지 않으면 저장
			AnnouncementLog log = AnnouncementLog.builder()
				.member(member)
				.announcement(announcement)
				.build();

			announcementLogRepository.save(log);
		}
	}

}
