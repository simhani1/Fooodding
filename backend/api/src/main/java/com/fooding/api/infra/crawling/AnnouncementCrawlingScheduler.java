package com.fooding.api.infra.crawling;

import java.io.IOException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.firebase.messaging.FirebaseMessagingException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementCrawlingScheduler {
	private final AnnouncementCrawler announcementCrawler;

	@Scheduled(cron = "0 0/5 * * * ?")
	public void scheduleCrawling() {
		try {
			announcementCrawler.crawlAnnouncements();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (FirebaseMessagingException e) {
			throw new RuntimeException(e);
		}
	}

}
