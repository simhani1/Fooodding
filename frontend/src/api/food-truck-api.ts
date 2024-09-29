import {
	IMenuDTO,
	IMenuResponseDTO,
	ApiResponse,
	IFoodTruckDTO,
	INoResponseDTO,
	IFoodTruckResponseDTO,
	IFoodTruckCreateResponseDTO,
	ContentType,
} from "@interface/api";
import axiosInstance from "@api/axiosInstance";

const path = "/foodtrucks";

export const registerFoodTruck = (req: IFoodTruckDTO): ApiResponse<IFoodTruckCreateResponseDTO> => {
	return axiosInstance.post(`${path}`, req);
};

export const updateFoodTruck = (foodTruckId: number, req: IFoodTruckDTO): ApiResponse<INoResponseDTO> => {
	return axiosInstance.post(`${path}/${foodTruckId}`, req);
};

export const getFoodTruck = (foodTruckId: number): ApiResponse<IFoodTruckResponseDTO> => {
	return axiosInstance.get(`${path}?ft-id=${foodTruckId}`);
};

export const getMenuList = (foodTruckId: number): ApiResponse<IMenuResponseDTO> => {
	return axiosInstance.get(`${path}/${foodTruckId}/menu`);
};
export const registerMenu = ({ req, menuImg }: IMenuDTO) => {
	return axiosInstance.post(
		`${path}/menu`,
		{
			req,
			menuImg,
		},
		{
			headers: {
				"Content-Type": ContentType.FormData,
			},
		},
	);
};
export const updateMenu = (menuId: number, { req, menuImg }: IMenuDTO) => {
	return axiosInstance.patch(`${path}/menu/${menuId}`, {
		req,
		menuImg,
	});
};
export const deleteMenu = (menuId: number) => {
	return axiosInstance.delete(`${path}/menu/${menuId}`);
};
