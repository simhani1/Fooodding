package com.fooding.api.foodtruck.service;

import org.springframework.web.multipart.MultipartFile;

public interface UploadMenuImgHelper {

	String uploadMenuImg(MultipartFile file);

}
