package com.fooding.api.infra.crawling;

import java.io.IOException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AnnouncementCrawlingScheduler {
	private final AnnouncementCrawler announcementCrawler;

	public AnnouncementCrawlingScheduler(AnnouncementCrawler announcementCrawler) {
		this.announcementCrawler = announcementCrawler;
	}

	@Scheduled(cron = "0 0/5 * * * ?")
	public void scheduleCrawling() {
		try {
			announcementCrawler.crawlAnnouncements();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
