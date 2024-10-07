import { AxiosResponse } from "axios";
import { Category } from "@interface/owner";
import { IWaitingInfo } from "./waiting";
import { IMenuInfo, ITruckListInfo } from "./foodTruck";

export enum ContentType {
	Json = "application/json",
	FormData = "multipart/form-data",
	UrlEncoded = "application/x-www-form-urlencoded",
	Text = "text/plain",
}

// response
export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export interface IBaseResponseDTO {
	code: string;
	message: string;
	isSuccess: boolean;
}

//응답 data가 없을 떄
export interface INoResponseDTO extends IBaseResponseDTO {
	data: null;
}

export interface IReissueResponseDTO extends IBaseResponseDTO {
	data: {
		accessToken: string;
	};
}

export interface INaverLoginResponseDTO extends IBaseResponseDTO {
	data: {
		nickname: string;
		accessToken: string;
		foodTruckId: number;
	};
}

export interface IFoodTruckResponseDTO extends IBaseResponseDTO {
	data: IFoodTruckInfo;
}

export interface IFoodTruckCreateResponseDTO extends IBaseResponseDTO {
	data: {
		foodTruckId: number;
	};
}

//푸드트럭 정보 조회
export interface IFoodTruckOwnerInfoDTO extends IBaseResponseDTO {
	data: {
		foodTruckId: number;
		licenseNumber: string;
		name: string;
		introduction: string;
		category: string;
		menuList: IMenuResponseDTO[];
	};
}

//사용자의 푸드트럭 상세 조회
export interface IFoodTruckDetailUserInfoDTO extends IBaseResponseDTO {
	data: {
		foodTruckId: number;
		licenseNumber: string;
		name: string;
		introduction: string;
		category: string;
		menuList: IMenuInfo[];
		isReserved: boolean;
		waitingInfo: IWaitingInfo;
	};
}

//메뉴
export interface IMenuResponseDTO extends IBaseResponseDTO {
	menuId: number;
	name: string;
	price: number;
	img: string;
	onSale: boolean;
}

// auth
export interface INaverLoginDTO {
	accessToken: string;
	role: string;
}

export type RoleParam = "owners" | "users";

export enum Role {
	owners = "OWNER",
	users = "USER",
}

// menu
export interface IMenuDTO {
	req: {
		name: string;
		price: number;
	};
	menuImg?: File;
}

// food-truck
export interface IFoodTruckDTO {
	name: string;
	licenseNumber: string;
	introduction?: string;
	category: Category;
}

export interface IFoodTruckInfo {
	foodTruckId: number;
	licenseNumber: string;
	name: string;
	introduction: string;
	category: Category;
}

//foodTruckList에서의 info
export interface IFoodTruckListInfoResponseDTO extends IBaseResponseDTO {
	data: ITruckListInfo[];
}

// owner-api
export interface IOwnerAnnouncementResponseDTO extends IBaseResponseDTO {
	data: IOwnerAnnouncementDTO[];
}

export interface IOwnerAnnouncementDTO {
	announcementId: number;
	url: string;
	title: string;
	date: string;
	time: string;
	place: string;
	isOpened: boolean;
}
