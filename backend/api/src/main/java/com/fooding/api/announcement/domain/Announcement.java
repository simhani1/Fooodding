package com.fooding.api.announcement.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "announcement")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Announcement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "announcement_id")
	private Long id;

	@Column(name = "announcement_url", nullable = false)
	private String url;

	@Column(name = "announcement_title", nullable = false)
	private String title;

	@Column(name = "announcement_date", nullable = false)
	private String date;

	@Column(name = "announcement_time", nullable = false)
	private String time;

	@Column(name = "announcement_place", nullable = false)
	private String place;

	@Builder
	public Announcement(String url, String title, String date, String time, String place) {
		this.url = url;
		this.title = title;
		this.date = date;
		this.time = time;
		this.place = place;
	}

	public void changeTitle(String title) {
		this.title = title;
	}
}
