import axiosInstance from "./axiosInstance";
import { ApiResponse, IFoodTruckDetailUserInfoDTO, IFoodTruckListInfoResponseDTO } from "@interface/api";
import { IMyPosition } from "@interface/map";

const path = "/foodtrucks";

//유저의 푸드트럭 리스트 조회
export const getFoodTruckList = (myPosition: IMyPosition): ApiResponse<IFoodTruckListInfoResponseDTO> => {
	return axiosInstance.get(`${path}/list`, {
		params: myPosition,
	});
};

//유저의 푸드트럭 상세 조회
export const getFoodTruckDetailInfo = (foodTruckId: number): ApiResponse<IFoodTruckDetailUserInfoDTO> => {
	return axiosInstance.get(`${path}/${foodTruckId}/users`);
};
