package com.fooding.api.member.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.aop.member.MemberContext;
import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.member.controller.request.NaverLoginReq;
import com.fooding.api.member.controller.request.NaverUpdateReq;
import com.fooding.api.member.controller.request.ReissueReq;
import com.fooding.api.member.exception.NoRefreshTokenException;
import com.fooding.api.member.service.AuthService;
import com.fooding.api.member.service.ReissueTokenService;
import com.fooding.api.member.service.dto.LoginDto;
import com.fooding.api.member.service.dto.ReissueDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/members/auth/users")
@RequiredArgsConstructor
@RestController
public class UserAuthController {

	private static final String REFRESH_TOKEN = "refreshToken";
	private final AuthService authService;
	private final ReissueTokenService reissueTokenService;
	@Value("${jwt.refresh-token.expiretime}")
	private Integer REFRESH_TOKEN_EXPIRATION_TIME;

	/* 로그인 진행 */
	@PostMapping("/login/naver")
	public ResponseEntity<BaseResponse<LoginDto>> naverLogin(@RequestBody NaverLoginReq req,
		HttpServletResponse response) {
		LoginDto res = authService.naverLogin(req.accessToken(), req.role());

		Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, res.refreshToken());
		refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME / 1000);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setDomain("j11a608.p.ssafy.io");
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

	/* 로그아웃 진행 */
	@RequireJwtToken
	@PostMapping("/logout")
	public ResponseEntity<BaseResponse<?>> logout(HttpServletRequest request, HttpServletResponse response) {
		Long userId = MemberContext.getMemberId();

		String refreshToken = Arrays.stream(request.getCookies())
			.filter(cookie -> REFRESH_TOKEN.equals(cookie.getName()))
			.map(Cookie::getValue)
			.findFirst()
			.orElseThrow(() -> new NoRefreshTokenException("Refresh token is null"));

		authService.logout(userId, refreshToken);

		Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, null);
		refreshTokenCookie.setMaxAge(0);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	/* 회원 정보 입력*/
	@RequireJwtToken
	@PatchMapping("")
	public ResponseEntity<BaseResponse<?>> update(@RequestBody NaverUpdateReq req) {
		Long userId = MemberContext.getMemberId();
		authService.updateId(userId, req.gender(), req.ages());
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	/* 회원 탈퇴 */
	@RequireJwtToken
	@PatchMapping("/withdraw")
	public ResponseEntity<BaseResponse<?>> withdraw() {
		Long userId = MemberContext.getMemberId();
		authService.withdraw(userId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@PostMapping("/reissue")
	public ResponseEntity<BaseResponse<ReissueDto>> reissueToken(@RequestBody ReissueReq req,
		HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = Arrays.stream(request.getCookies())
			.filter(cookie -> REFRESH_TOKEN.equals(cookie.getName()))
			.map(Cookie::getValue)
			.findFirst()
			.orElseThrow(() -> new NoRefreshTokenException("Refresh token is null"));

		ReissueDto newToken = reissueTokenService.reissueToken(refreshToken, req.role());

		Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, newToken.refreshToken());
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME / 1000);
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess(newToken));
	}

}