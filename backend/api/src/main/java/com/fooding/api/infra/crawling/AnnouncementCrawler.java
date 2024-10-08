package com.fooding.api.infra.crawling;

import java.io.IOException;
import java.util.List;

import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.fooding.api.announcement.domain.Announcement;
import com.fooding.api.announcement.repository.AnnouncementRepository;
import com.fooding.api.fcm.service.FcmMessageService;
import com.fooding.api.fcm.service.dto.FcmMessageDto;
import com.google.firebase.messaging.FirebaseMessagingException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementCrawler {

	private static final String BASE_URL = "https://www.koreafoodtruck.org";
	private final AnnouncementRepository announcementRepository;
	private final FcmMessageService fcmMessageService;

	public void crawlAnnouncements() throws IOException {
		List<Announcement> announcementList = announcementRepository.findAll();

		Document doc = Jsoup.connect(BASE_URL + "/blank-6")
			.header("Accept-Language", "ko-KR,ko;q=0.9")
			.userAgent("Mozilla/5.0")
			.get();

		// 게시물 링크 크롤링
		Elements postLinks = doc.select(
			"a[href^=https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/]");

		postLinks.stream()
			.map(link -> link.attr("href"))
			.forEach(postLink -> {
				announcementList.stream()
					.filter(a -> a.getUrl().equals(postLink))
					.findFirst()
					.ifPresentOrElse(
						existingAnnouncement -> updateAnnouncement(existingAnnouncement, postLink),
						() -> processNewAnnouncement(postLink, announcementList)
					);
			});

		announcementRepository.saveAll(announcementList);
	}

	private void updateAnnouncement(Announcement existingAnnouncement, String postLink) {
		Document postDoc = fetchDocument(postLink);
		if (postDoc == null) return;

		String title = extractTitle(postDoc);
		if (!existingAnnouncement.getTitle().equals(title)) {
			existingAnnouncement.changeTitle(title);
		}
	}

	private void processNewAnnouncement(String postLink, List<Announcement> announcementList) {
		Document postDoc = fetchDocument(postLink);
		if (postDoc == null) return;

		String title = extractTitle(postDoc);

		// 제목에 특정 문자열이 포함된 경우 건너뛰기
		if (title.contains("※ 푸드트럭 행사 한국푸드트럭협회 카카오톡 플러스친구 안내")) {
			return;
		}

		Announcement announcement = Announcement.builder()
			.url(postLink)
			.title(title)
			.date(extractEventDate(postDoc))
			.time(extractOperatingTime(postDoc))  // 수정된 운영시간 추출 메서드
			.place(extractLocation(postDoc))
			.build();

		announcementList.add(announcement);

		FcmMessageDto fcmMessageDto = FcmMessageDto.builder()
			.title("새로운 공고가 등록됐어요!📢")
			.message(title)
			.build();

		try {
			fcmMessageService.sendMessagesToOwners(fcmMessageDto);
		} catch (FirebaseMessagingException e) {
			e.printStackTrace();
		}
	}

	private Document fetchDocument(String postLink) {
		try {
			return Jsoup.connect(postLink).get();
		} catch (HttpStatusException e) {
			return null;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private String extractTitle(Document postDoc) {
		return postDoc.select("h1").text().replaceAll("\\[.*?\\]", "").trim();
	}

	private String extractEventDate(Document postDoc) {
		return extractDetail(postDoc, "일 자");
	}

	private String extractOperatingTime(Document postDoc) {
		return postDoc.select("p")
			.stream()
			.map(Element::text)
			.filter(text -> text.contains("운영시간"))
			.map(text -> text.substring(text.indexOf(":") + 1).trim())  // ":" 이후의 전체 텍스트 추출
			.findFirst()
			.orElse(null);
	}

	private String extractLocation(Document postDoc) {
		return extractDetail(postDoc, "장 소");
	}

	private String extractDetail(Document postDoc, String keyword) {
		return postDoc.select("p")
			.stream()
			.map(Element::text)
			.filter(text -> text.contains(keyword))
			.map(text -> text.split(":")[1].trim())
			.findFirst()
			.orElse(null);
	}
}
