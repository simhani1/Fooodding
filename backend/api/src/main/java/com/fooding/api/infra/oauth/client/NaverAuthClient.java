package com.fooding.api.infra.oauth.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooding.api.infra.oauth.dto.NaverMemberInfo;

@Component
public class NaverAuthClient {

	@Value("${naver.loginurl}")
	private String loginUrl;

	@Value("${naver.secret.key}")
	private String NAVER_SECRET;

	/**
	 * 네이버 유저 정보 가져오기
	 */
	public NaverMemberInfo getUserInfo(String accessToken) {
		NaverMemberInfo userInfo = new NaverMemberInfo();
		WebClient webClient = WebClient.builder().build();

		String response = webClient.get()
			.uri(loginUrl)
			.header("Authorization", "Bearer " + accessToken)
			.retrieve()
			.bodyToMono(String.class)
			.block();

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			userInfo = objectMapper.readValue(response, new TypeReference<NaverMemberInfo>() {});
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return userInfo;
	}
}