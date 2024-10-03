import {
	IMenuDTO,
	ApiResponse,
	IFoodTruckDTO,
	INoResponseDTO,
	IFoodTruckCreateResponseDTO,
	ContentType,
	IFoodTruckOwnerInfoDTO,
	IFoodTruckResponseDTO,
} from "@interface/api";
import axiosInstance from "@api/axiosInstance";
import { ITodayMarketOpen } from "@interface/owner";

const path = "/foodtrucks";

const convertFormData = ({ req, menuImg }: IMenuDTO) => {
	const formData = new FormData();
	formData.append("req", new Blob([JSON.stringify(req)], { type: "application/json" }));
	if (menuImg) {
		formData.append("menuImg", menuImg);
	}
	return formData;
};

export const registerFoodTruck = (req: IFoodTruckDTO): ApiResponse<IFoodTruckCreateResponseDTO> => {
	return axiosInstance.post(`${path}`, req);
};

export const updateFoodTruck = (foodTruckId: number, req: IFoodTruckDTO): ApiResponse<INoResponseDTO> => {
	return axiosInstance.patch(`${path}/${foodTruckId}`, req);
};

// 사장님 푸드트럭 상세 조회
export const getOwnerFoodTruck = (): ApiResponse<IFoodTruckResponseDTO> => {
	return axiosInstance.get(`${path}/owners`);
};

export const getMenuList = (): ApiResponse<IFoodTruckOwnerInfoDTO> => {
	return axiosInstance.get(`${path}/owners`);
};

export const registerMenu = (foodTruckId: number, { req, menuImg }: IMenuDTO): ApiResponse<INoResponseDTO> => {
	const formData = convertFormData({ req, menuImg });

	return axiosInstance.post(`${path}/${foodTruckId}/menu`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const updateMenu = (
	foodTruckId: number,
	menuId: number,
	{ req, menuImg }: IMenuDTO,
): ApiResponse<INoResponseDTO> => {
	const formData = convertFormData({ req, menuImg });

	return axiosInstance.patch(`${path}/${foodTruckId}/menu/${menuId}`, formData, {
		headers: {
			"Content-Type": ContentType.FormData,
		},
	});
};

export const deleteMenu = (menuId: number): ApiResponse<INoResponseDTO> => {
	return axiosInstance.delete(`${path}/menu/${menuId}`);
};

//장사시작
export const openMarket = (foodTruckId: number, req: ITodayMarketOpen) => {
	return axiosInstance.patch(`${path}/${foodTruckId}/open`, req);
};
