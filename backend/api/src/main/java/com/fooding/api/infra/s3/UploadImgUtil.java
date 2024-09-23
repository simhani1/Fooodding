package com.fooding.api.infra.s3;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fooding.api.foodtruck.service.UploadMenuImgHelper;
import com.fooding.api.infra.s3.exception.S3Exception;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
class UploadImgUtil implements UploadMenuImgHelper {

	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final String MENU_IMG_DIR = "menu/";

	@Override
	public String uploadMenuImg(MultipartFile file) {
		return upload(file, MENU_IMG_DIR);
	}

	private String upload(MultipartFile file, String dirName) {
		if (file.isEmpty()) {
			throw new S3Exception("Image file is empty");
		}
		String fileName = dirName + "/" + UUID.randomUUID() + file.getOriginalFilename();
		try (InputStream inputStream = file.getInputStream()) {
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(file.getSize());
			amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, metadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			throw new S3Exception("error: MultipartFile -> S3 upload fail");
		}
		return amazonS3.getUrl(bucket, fileName).toString();
	}

}
