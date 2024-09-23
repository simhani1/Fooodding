package com.fooding.api.core.aop.member;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.boot.task.ThreadPoolTaskExecutorBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fooding.api.core.aop.annotation.RequireJwtToken;
import com.fooding.api.core.jwt.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Aspect
@RequiredArgsConstructor
@Component
public class ExtractMemberIdAspect {

	private final String AUTHORIZATION_HEADER = "Authorization";
	private final JwtTokenProvider jwtTokenProvider;
	private final ThreadPoolTaskExecutorBuilder threadPoolTaskExecutorBuilder;

	@Around("@annotation(requireJwtToken)")
	public Object before(ProceedingJoinPoint pjp, RequireJwtToken requireJwtToken) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		String accessToken = request.getHeader(AUTHORIZATION_HEADER);
		Long memberId = jwtTokenProvider.getMemberId(accessToken);
		MemberContext.setMemberId(memberId);
		try {
			return pjp.proceed();
		} catch (Throwable e) {
			throw e;
		} finally {
			MemberContext.clear();
		}
	}
}
