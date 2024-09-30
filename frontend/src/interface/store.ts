import { IFoodTruckDTO, Role } from "@interface/api";

export interface IAuthState {
	isLoggined: boolean;
	role: Role;
	nickname: string;
	accessToken: string;
}
export interface IAuthAction {
	updateIsLoggined: (isLoggined: IAuthState["isLoggined"]) => void;
	updateRole: (role: IAuthState["role"]) => void;
	updateNickname: (nickname: IAuthState["nickname"]) => void;
	updateAccessToken: (accessToken: IAuthState["accessToken"]) => void;
	updateOnLogin: (newState: IAuthState) => void;
	reset: () => void;
}

export interface IFoodTruckState extends IFoodTruckDTO {
	foodTruckId: number;
}

export interface IFoodTruckAction {
	updateName: (name: IFoodTruckState["name"]) => void;
	updateLicenseNumber: (licenseNumber: IFoodTruckState["licenseNumber"]) => void;
	updateIntroduction: (introduction: IFoodTruckState["introduction"]) => void;
	updateCategory: (category: IFoodTruckState["category"]) => void;
	updateFoodTruckId: (category: IFoodTruckState["foodTruckId"]) => void;
	updateAll: (newState: IFoodTruckState) => void;
	reset: () => void;
}
