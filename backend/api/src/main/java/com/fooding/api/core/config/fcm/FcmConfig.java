package com.fooding.api.core.config.fcm;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Service
public class FcmConfig {

	@Value("${FCM_PRIVATE_KEY}")
	private String privateKey;
	@Value("${FCM_CLIENT_EMAIL}")
	private String clientEmail;
	@Value("${FCM_PROJECT_ID}")
	private String projectId;

	@PostConstruct
	public void initialize() throws IOException {
		String credentialsJson = String.format(
			"{\"type\":\"service_account\",\"project_id\":\"%s\",\"private_key\":\"%s\",\"client_email\":\"%s\"}",
			projectId, privateKey.replace("\\n", "\n"), clientEmail);

		InputStream serviceAccount = new ByteArrayInputStream(credentialsJson.getBytes());

		FirebaseOptions options = FirebaseOptions.builder()
			.setCredentials(GoogleCredentials.fromStream(serviceAccount))
			.build();

		if (FirebaseApp.getApps().isEmpty()) {
			FirebaseApp.initializeApp(options);
		}
	}
}
