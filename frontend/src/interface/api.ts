import { AxiosResponse } from "axios";
import { Category } from "@interface/owner";

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
	data: IFoodTruckDTO;
}

export interface IFoodTruckCreateResponseDTO extends IBaseResponseDTO {
	data: {
		foodTruckId: number;
	};
}

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
	role: Role;
}

export enum Role {
	GUEST = "",
	USER = "USER",
	OWNER = "OWNER",
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
