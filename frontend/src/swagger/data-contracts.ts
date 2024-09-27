/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FoodTruckReq {
	licenseNumber: string;
	name: string;
	introduction?: string;
	category: string;
}

export interface BaseResponseObject {
	code?: string;
	message?: string;
	data?: object;
	isSuccess?: boolean;
}

export interface MenuReq {
	name?: string;
	/** @format int32 */
	price?: number;
	onSale?: boolean;
}
