import { AxiosResponse } from "axios";

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

export interface IReissueResponseDTO extends IBaseResponseDTO {
	data: {
		accessToken: string;
	};
}

export interface INaverLoginResponseDTO extends IBaseResponseDTO {
	data: {
		nickname: string;
		accessToken: string;
	};
}

export interface IMenuResponseDTO extends IBaseResponseDTO {
	data: [
		{
			menuId: number;
			name: string;
			price: number;
			img: string;
			onSale: boolean;
		},
	];
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
	category: string;
}
