package com.fooding.api.announcement.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fooding.api.announcement.repository.custom.AnnouncementRepositoryCustom;
import com.fooding.api.announcement.service.AnnouncementCommandService;
import com.fooding.api.announcement.service.dto.AnnouncementDto;
import com.fooding.api.member.domain.Member;
import com.fooding.api.member.exception.NoMemberException;
import com.fooding.api.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
class AnnouncementCommandServiceImpl implements AnnouncementCommandService {
	private final MemberRepository memberRepository;
	private final AnnouncementRepositoryCustom announcementRepositoryCustom;

	@Override
	public List<AnnouncementDto> getAnnouncementByOwner(Long ownerId) {
		Member owner = memberRepository.findById(ownerId)
			.orElseThrow(() -> new NoMemberException("Owner not found with ID: " + ownerId));

		return announcementRepositoryCustom.findAnnouncementsByMember(owner);
	}

}
