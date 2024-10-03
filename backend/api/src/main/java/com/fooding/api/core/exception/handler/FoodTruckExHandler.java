package com.fooding.api.core.exception.handler;

import static com.fooding.api.core.exception.ResponseCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fooding.api.core.template.response.BaseResponse;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyClosedException;
import com.fooding.api.foodtruck.exception.FoodTruckAlreadyOpenedException;
import com.fooding.api.foodtruck.exception.FoodTruckIntroductionOverflowException;
import com.fooding.api.foodtruck.exception.FoodTruckNameOverflowException;
import com.fooding.api.foodtruck.exception.IllegalFoodTruckNameException;
import com.fooding.api.foodtruck.exception.IllegalLicenseNumberException;
import com.fooding.api.foodtruck.exception.IllegalMenuNameException;
import com.fooding.api.foodtruck.exception.IllegalMenuPriceException;
import com.fooding.api.foodtruck.exception.LicenseNumberOverflowException;
import com.fooding.api.foodtruck.exception.MenuNameOverflowException;
import com.fooding.api.foodtruck.exception.NoFoodTruckException;
import com.fooding.api.foodtruck.exception.NoMenuException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class FoodTruckExHandler {

	@ExceptionHandler(FoodTruckAlreadyClosedException.class)
	public ResponseEntity<BaseResponse<Object>> foodTruckAlreadyClosedException(FoodTruckAlreadyClosedException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(FOODTRUCK_ALREADY_CLOSED_EXCEPTION));
	}

	@ExceptionHandler(FoodTruckAlreadyOpenedException.class)
	public ResponseEntity<BaseResponse<Object>> foodTruckAlreadyOpenedException(FoodTruckAlreadyOpenedException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(FOODTRUCK_ALREADY_OPENED_EXCEPTION));
	}

	@ExceptionHandler(FoodTruckIntroductionOverflowException.class)
	public ResponseEntity<BaseResponse<Object>> foodTruckIntroductionOverflowException(
		FoodTruckIntroductionOverflowException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(FOODTRUCK_INTRODUCTION_OVERFLOW_EXCEPTION));
	}

	@ExceptionHandler(FoodTruckNameOverflowException.class)
	public ResponseEntity<BaseResponse<Object>> foodTruckNameOverflowException(FoodTruckNameOverflowException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(FOODTRUCK_NAME_OVERFLOW_EXCEPTION));
	}

	@ExceptionHandler(IllegalFoodTruckNameException.class)
	public ResponseEntity<BaseResponse<Object>> illegalFoodTruckNameException(IllegalFoodTruckNameException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(ILLEGAL_FOOD_TRUCK_NAME_EXCEPTION));
	}

	@ExceptionHandler(IllegalLicenseNumberException.class)
	public ResponseEntity<BaseResponse<Object>> illegalLicenseNumberException(IllegalLicenseNumberException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(ILLEGAL_LICENSE_NUMBER_EXCEPTION));
	}

	@ExceptionHandler(IllegalMenuNameException.class)
	public ResponseEntity<BaseResponse<Object>> illegalMenuNameException(IllegalMenuNameException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(ILLEGAL_MENU_NAME_EXCEPTION));
	}

	@ExceptionHandler(IllegalMenuPriceException.class)
	public ResponseEntity<BaseResponse<Object>> illegalMenuPriceException(IllegalMenuPriceException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(ILLEGAL_MENU_PRICE_EXCEPTION));
	}

	@ExceptionHandler(LicenseNumberOverflowException.class)
	public ResponseEntity<BaseResponse<Object>> licenseNumberOverflowException(LicenseNumberOverflowException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(LICENSE_NUMBER_OVERFLOW_EXCEPTION));
	}

	@ExceptionHandler(MenuNameOverflowException.class)
	public ResponseEntity<BaseResponse<Object>> menuNameOverflowException(MenuNameOverflowException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(MENU_NAME_OVERFLOW_EXCEPTION));
	}

	@ExceptionHandler(NoFoodTruckException.class)
	public ResponseEntity<BaseResponse<Object>> noFoodTruckException(NoFoodTruckException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_FOOD_TRUCK_EXCEPTION));
	}

	@ExceptionHandler(NoMenuException.class)
	public ResponseEntity<BaseResponse<Object>> noMenuException(NoMenuException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(BaseResponse.ofFail(NO_MENU_EXCEPTION));
	}

}
