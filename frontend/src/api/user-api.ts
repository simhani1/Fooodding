import { ApiResponse, IFoodTruckDetailUserInfoDTO } from "@interface/api";
import axiosInstance from "./axiosInstance";

const path = "/foodtrucks";

//유저의 푸드트럭 상세 조회
export const getFoodTruckDetailInfo = (foodTruckId: number): ApiResponse<IFoodTruckDetailUserInfoDTO> => {
	return axiosInstance.get(`${path}/${foodTruckId}/users`);
};
