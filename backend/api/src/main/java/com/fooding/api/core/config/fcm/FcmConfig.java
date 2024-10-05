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

	@Value("${fcm.type}")
	private String type;

	@Value("${fcm.project-id}")
	private String projectId;

	@Value("${fcm.private-key-id}")
	private String privateKeyId;

	@Value("${fcm.private-key}")
	private String privateKey;

	@Value("${fcm.client-email}")
	private String clientEmail;

	@Value("${fcm.client-id}")
	private String clientId;

	@Value("${fcm.auth-uri}")
	private String authUri;

	@Value("${fcm.token-uri}")
	private String tokenUri;

	@Value("${fcm.auth_provider_x509_cert_url}")
	private String authProviderCertUrl;

	@Value("${fcm.client_x509_cert_url}")
	private String clientCertUrl;

	@Value("${fcm.universe_domain}")
	private String universeDomain;

	@PostConstruct
	public void initialize() throws IOException {
		String credentialsJson = String.format(
			"{\"type\":\"%s\",\"project_id\":\"%s\",\"private_key_id\":\"%s\",\"private_key\":\"%s\",\"client_email\":\"%s\",\"client_id\":\"%s\",\"auth_uri\":\"%s\",\"token_uri\":\"%s\",\"auth_provider_x509_cert_url\":\"%s\",\"client_x509_cert_url\":\"%s\",\"universe_domain\":\"%s\"}",
			type, projectId, privateKeyId, privateKey.replace("\\n", "\n"), clientEmail, clientId, authUri, tokenUri,
			authProviderCertUrl, clientCertUrl, universeDomain);

		InputStream serviceAccount = new ByteArrayInputStream(credentialsJson.getBytes());

		FirebaseOptions options = FirebaseOptions.builder()
			.setCredentials(GoogleCredentials.fromStream(serviceAccount))
			.build();

		if (FirebaseApp.getApps().isEmpty()) {
			FirebaseApp.initializeApp(options);
		}
	}
}
