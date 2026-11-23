package com.fooding.api.core.config.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import java.time.Duration;

import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

import io.lettuce.core.ClientOptions;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.fooding.api.notification.service.impl.NotificationServiceImpl;

@Configuration
@EnableRedisRepositories
@EnableTransactionManagement
public class RedisConfig {

	@Value("${spring.data.redis.host}")
	private String host;

	@Value("${spring.data.redis.port}")
	private int port;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		// Fail fast when Redis is down: Lettuce otherwise queues commands for 60s, and SSE publish runs on the
		// guest's request thread — a Redis outage would hang every reservation instead of only dropping a notification.
		LettuceClientConfiguration client = LettuceClientConfiguration.builder()
			.commandTimeout(Duration.ofMillis(500))
			.clientOptions(ClientOptions.builder()
				.disconnectedBehavior(ClientOptions.DisconnectedBehavior.REJECT_COMMANDS)
				.build())
			.build();
		return new LettuceConnectionFactory(new RedisStandaloneConfiguration(host, port), client);
	}

	@Bean
	public RedisTemplate<?, ?> redisTemplate() {
		RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory());
		return template;
	}

	@Bean
	public RedisMessageListenerContainer redisMessageListenerContainer(NotificationServiceImpl sseListener) {
		RedisMessageListenerContainer container = new RedisMessageListenerContainer();
		container.setConnectionFactory(redisConnectionFactory());
		container.addMessageListener(sseListener, new ChannelTopic(NotificationServiceImpl.CHANNEL));
		return container;
	}
}
