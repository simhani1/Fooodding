package com.fooding.api.sse;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.AbstractPlatformTransactionManager;
import org.springframework.transaction.support.DefaultTransactionStatus;
import org.springframework.transaction.support.TransactionTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooding.api.waiting.event.WaitingChangedEvent;
import com.fooding.api.waiting.repository.impl.EmitterRepositoryImpl;

import io.micrometer.core.instrument.simple.SimpleMeterRegistry;

@SpringJUnitConfig(WaitingChangedAfterCommitTest.Config.class)
class WaitingChangedAfterCommitTest {

	@Configuration
	@EnableTransactionManagement
	static class Config {
		@Bean
		StringRedisTemplate redis() {
			return mock(StringRedisTemplate.class);
		}

		@Bean
		SseService sseService(StringRedisTemplate redis) {
			return new SseService(new EmitterRepositoryImpl(), redis, new ObjectMapper(),
				new SimpleMeterRegistry(), "api-1");
		}

		/** No-op transaction manager: real commit/rollback synchronization, no database. */
		@Bean
		PlatformTransactionManager transactionManager() {
			return new AbstractPlatformTransactionManager() {
				@Override
				protected Object doGetTransaction() {
					return new Object();
				}

				@Override
				protected void doBegin(Object tx, TransactionDefinition def) {
				}

				@Override
				protected void doCommit(DefaultTransactionStatus status) {
				}

				@Override
				protected void doRollback(DefaultTransactionStatus status) {
				}
			};
		}
	}

	@Autowired
	ApplicationEventPublisher events;
	@Autowired
	StringRedisTemplate redis;
	@Autowired
	PlatformTransactionManager txManager;

	@BeforeEach
	void reset() {
		clearInvocations(redis);
	}

	@Test
	void publishesToRedisOnlyAfterCommit() {
		new TransactionTemplate(txManager).executeWithoutResult(status -> {
			events.publishEvent(new WaitingChangedEvent(7L, "reserved", "{}"));
			verify(redis, never()).convertAndSend(anyString(), anyString());   // still inside the transaction
		});
		verify(redis).convertAndSend(eq(SseService.CHANNEL), contains("\"name\":\"reserved\""));
	}

	@Test
	void doesNotPublishWhenTheTransactionRollsBack() {
		new TransactionTemplate(txManager).executeWithoutResult(status -> {
			events.publishEvent(new WaitingChangedEvent(7L, "reserved", "{}"));
			status.setRollbackOnly();
		});
		verify(redis, never()).convertAndSend(anyString(), anyString());
	}
}
