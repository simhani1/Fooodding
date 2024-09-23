package com.fooding.api.infra.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class NaverMemberInfo {

	@JsonProperty("resultcode")
	private String resultCode;

	@JsonProperty("message")
	private String message;

	@JsonProperty("response")
	private NaverAccount naverAccount;

	@Getter
	public static class NaverAccount {

		@JsonProperty("id")
		private String id;

		@JsonProperty("nickname")
		private String nickname;

		@JsonProperty("name")
		private String name;

		@JsonProperty("gender")
		private String gender;

		@JsonProperty("age")
		private String age;

		@JsonProperty("email")
		private String email;
	}
}