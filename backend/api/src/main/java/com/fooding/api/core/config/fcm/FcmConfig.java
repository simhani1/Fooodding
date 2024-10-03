package com.fooding.api.core.config.fcm;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Service
public class FcmConfig {

	@Value("${fcm-service-key}")
	private String FCM_CONFIG_PATH;

	@PostConstruct
	public void initialize() throws IOException {
		ClassPathResource resource = new ClassPathResource(FCM_CONFIG_PATH);

		try (InputStream serviceAccount = resource.getInputStream()) {
			FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
			}
		}
	}

}
