package com.fooding.api.member.controller;

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
import com.fooding.api.member.controller.request.LogoutReq;
import com.fooding.api.member.controller.request.NaverLoginReq;
import com.fooding.api.member.controller.request.ReissueReq;
import com.fooding.api.member.service.AuthService;
import com.fooding.api.member.service.ReissueTokenService;
import com.fooding.api.member.service.dto.LoginDto;
import com.fooding.api.member.service.dto.ReissueDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/members/auth/owners")
@RequiredArgsConstructor
@RestController
public class OwnerAuthController {

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
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME / 1000);
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess(res));
	}

	/* 로그아웃 진행 */
	@RequireJwtToken
	@PostMapping("/logout")
	public ResponseEntity<BaseResponse<?>> logout(@RequestBody LogoutReq req, HttpServletResponse response) {
		Long ownerId = MemberContext.getMemberId();
		authService.logout(ownerId, req.refreshToken());

		Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, null);
		refreshTokenCookie.setMaxAge(0);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	/* 회원 탈퇴 */
	@RequireJwtToken
	@PatchMapping("/withdraw")
	public ResponseEntity<BaseResponse<?>> withdraw() {
		Long ownerId = MemberContext.getMemberId();
		authService.withdraw(ownerId);
		return ResponseEntity.ok(BaseResponse.ofSuccess());
	}

	@PostMapping("/reissue")
	public ResponseEntity<BaseResponse<ReissueDto>> reissueToken(@RequestBody ReissueReq req,
		HttpServletResponse response) {
		ReissueDto newToken = reissueTokenService.reissueToken(req.refreshToken(), req.role());

		Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, newToken.refreshToken());
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME / 1000);
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(BaseResponse.ofSuccess(newToken));
	}

}