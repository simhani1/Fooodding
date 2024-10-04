package com.fooding.api.infra.crawling;

import java.io.IOException;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.fooding.api.announcement.domain.Announcement;
import com.fooding.api.announcement.repository.AnnouncementRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementCrawler {

	private static final String BASE_URL = "https://www.koreafoodtruck.org";
	private final AnnouncementRepository announcementRepository;

	public void crawlAnnouncements() throws IOException {
		List<Announcement> announcementList = announcementRepository.findAll();

		Document doc = Jsoup.connect(BASE_URL + "/blank-6")
			.header("Accept-Language", "ko-KR,ko;q=0.9")
			.userAgent("Mozilla/5.0")
			.get();

		// 게시물 링크 크롤링
		Elements postLinks = doc.select(
			"a[href^=https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/]");
		
		for (Element link : postLinks) {
			String postLink = link.attr("href");

			Announcement existingAnnouncement = announcementList.stream()
				.filter(a -> a.getUrl().equals(postLink))
				.findFirst()
				.orElse(null);

			Document postDoc = Jsoup.connect(postLink).get();
			String title = postDoc.select("h1").text();

			title = title.replaceAll("\\[.*?\\]", "").trim();

			if (announcementList != null) {
				if (!existingAnnouncement.getTitle().equals(title)) {
					existingAnnouncement.changeTitle(title);
				}
			} else {
				// 제목에 특정 문자열이 포함된 경우 전체 크롤링 건너뛰기
				if (title.contains("※ 푸드트럭 행사 한국푸드트럭협회 카카오톡 플러스친구 안내")) {
					continue;
				}

				// 세부 정보를 추출
				String eventDate = null;
				String operatingTime = null;
				String location = null;
				Elements paragraphs = postDoc.select("p");

				boolean extract = false;
				for (Element paragraph : paragraphs) {
					String text = paragraph.text();
					// 원하는 구간 시작
					if (text.contains("행사명")) {
						extract = true;
					}
					if (extract) {
						// 각각의 정보를 추출
						if (text.contains("일 자")) {
							eventDate = text.split(":")[1].trim();
						}
						if (text.contains("운영시간")) {
							operatingTime = text.substring(text.indexOf(":") + 1).trim();  // ":" 이후의 전체 텍스트를 추출
						}
						if (text.contains("장 소")) {
							location = text.split(":")[1].trim();
						}
					}
				}

				Announcement announcement = Announcement.builder()
					.url(postLink)
					.title(title)
					.date(eventDate)
					.time(operatingTime)
					.place(location)
					.build();

				announcementList.add(announcement);
			}

			if (!announcementList.isEmpty()) {
				announcementRepository.saveAll(announcementList);
			}
		}
	}

}
