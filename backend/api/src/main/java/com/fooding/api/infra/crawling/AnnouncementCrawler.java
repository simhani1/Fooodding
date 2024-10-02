package com.fooding.api.infra.crawling;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.fooding.api.announcement.service.dto.AnnouncementDto;

@Component
public class AnnouncementCrawler {

	private static final String BASE_URL = "https://www.koreafoodtruck.org";

	public List<AnnouncementDto> crawlAnnouncements() throws IOException {
		List<AnnouncementDto> announcementList = new ArrayList<>();

		Document doc = Jsoup.connect(BASE_URL + "/blank-6")
			.header("Accept-Language", "ko-KR,ko;q=0.9")
			.userAgent("Mozilla/5.0")
			.get();

		// 게시물 링크 크롤링
		Elements postLinks = doc.select("a[href^=https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/]");

		for (Element link : postLinks) {
			String postLink = link.attr("href");
			Document postDoc = Jsoup.connect(postLink).get();
			String title = postDoc.select("h1").text();

			// 상세 정보 크롤링 (일자, 운영시간, 장소)
			String eventDate = postDoc.select("p:contains(일자)").text().split(":")[1].trim();
			String operatingTime = postDoc.select("p:contains(운영시간)").text().split(":")[1].trim();
			String location = postDoc.select("p:contains(장소)").text().split(":")[1].trim();

			// AnnouncementDto 생성 및 리스트에 추가
			AnnouncementDto announcementDto = AnnouncementDto.builder()
				.url(postLink)
				.title(title)
				.date(eventDate)
				.time(operatingTime)
				.place(location)
				.isopened(false)
				.build();

			announcementList.add(announcementDto);
		}

		return announcementList;
	}
}
