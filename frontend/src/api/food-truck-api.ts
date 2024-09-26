import { IMenuDTO, IMenuResponseDTO, ApiResponse, IFoodTruckDTO } from "@interface/api";
import axiosInstance from "@api/axiosInstance";
import { ContentType } from "@interface/api";

const path = "/foodtrucks";

export const foodTruckRegister = (req: IFoodTruckDTO) => {
	return axiosInstance.post(`${path}`, req);
};

export const foodTruckUpdate = (foodTruckId: number, req: IFoodTruckDTO) => {
	return axiosInstance.post(`${path}/${foodTruckId}`, req);
};

export const menuList = (foodTruckId: number): ApiResponse<IMenuResponseDTO> => {
	return axiosInstance.get(`${path}/${foodTruckId}/menu`);
};
export const menuRegister = ({ req, menuImg }: IMenuDTO) => {
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
export const menuUpdate = (menuId: number, { req, menuImg }: IMenuDTO) => {
	return axiosInstance.patch(`${path}/menu/${menuId}`, {
		req,
		menuImg,
	});
};
export const menuDelete = (menuId: number) => {
	return axiosInstance.delete(`${path}/menu/${menuId}`);
};
