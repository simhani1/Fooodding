package com.fooding.api.core.jwt;

import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.fooding.api.core.jwt.dto.JwtToken;
import com.fooding.api.core.jwt.exception.UnAuthorizedException;
import com.fooding.api.core.jwt.exception.UnSupportedJwtException;
import com.fooding.api.member.domain.MemberRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	private final RedisTemplate<String, String> redisTemplate;

	@Value("${jwt.secret.key}")
	private String SECRET_KEY;

	@Value("${jwt.access-token.expiretime}")
	private Integer ACCESS_TOKEN_EXPIRATION_TIME;

	@Value("${jwt.refresh-token.expiretime}")
	private Integer REFRESH_TOKEN_EXPIRATION_TIME;

	public JwtToken createToken(Long memberId, MemberRole role) {
		String accessToken = createAccessToken(memberId, role);
		String refreshToken = createRefreshToken();
		redisTemplate.opsForValue().set(
			refreshToken,
			memberId.toString(),
			REFRESH_TOKEN_EXPIRATION_TIME,
			TimeUnit.MILLISECONDS
		);

		return JwtToken.builder().accessToken(accessToken).refreshToken(refreshToken).build();
	}

	private String createAccessToken(Long memberId, MemberRole role) {
		StringBuilder sb = new StringBuilder();
		sb.append("Bearer ");
		sb.append(
			Jwts.builder()
				.setSubject(memberId.toString())
				.claim("memberId", memberId)
				.claim("authorities", role.toString())
				.setExpiration(
					new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
				.signWith(
					Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
				.compact());
		return sb.toString();
	}

	private String createRefreshToken() {
		return UUID.randomUUID().toString() + "-" + System.currentTimeMillis();
	}

	public void deleteRefreshToken(String refreshToken) {
		redisTemplate.delete(refreshToken);
	}

	public boolean validateToken(String accessToken) {
		log.info("secret key: {}", SECRET_KEY);
		if (!accessToken.startsWith("Bearer ")) {
			return false;
		}
		try {
			return parseClaims(accessToken).getExpiration().after(new Date());
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.error("잘못된 JWT 서명입니다.", e);
		} catch (ExpiredJwtException e) {
			log.error("만료된 JWT 토큰입니다.");
		} catch (UnSupportedJwtException e) {
			log.error("지원하지 않는 JWT 토큰입니다.", e);
		} catch (IllegalArgumentException e) {
			log.error("JWT 토큰이 없거나 잘못되었습니다.", e);
		}
		return false;
	}

	public Long getMemberId(String accessToken) {
		Claims claims = null;
		try {
			claims = parseClaims(accessToken);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new UnAuthorizedException();
		}
		return claims.get("memberId", Long.class);
	}

	public Long getMemberIdFromRefreshToken(String refreshToken) {
		String memberId = redisTemplate.opsForValue().get(refreshToken);
		if (memberId == null) {
			throw new UnAuthorizedException("Invalid refresh token");
		}
		return Long.parseLong(memberId);
	}

	private Claims parseClaims(String accessToken) {
		return Jwts.parserBuilder()
			.setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
			.build()
			.parseClaimsJws(accessToken.replace("Bearer ", ""))
			.getBody();
	}
}