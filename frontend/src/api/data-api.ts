import { ICongestionResponseDTO } from "@interface/api";
import axiosInstance from "./axiosInstance";
import axiosInstanceFlask from "./axiosInstanceFlask";

// 성별 & 연령대 평균 손님 수 조회
export const getWaitingByGenderAge = async () => {
	return await axiosInstance.get("/waiting/log/users");
};

// 요일 & 시간대 평균 손님 수 조회
export const getWaitingByTime = async () => {
	return await axiosInstance.get("/waiting/log/time");
};

// 추천 구역 TOP 10 조회
export const getRecommend = async (foodtruckId: number) => {
	return await axiosInstance.post("/recommend", {
		foodtruckId: foodtruckId,
	});
};

// 동별 혼잡도 조회
export const getCongestion = async (): Promise<ICongestionResponseDTO> => {
	return await axiosInstanceFlask.get("/congestion");
};

// 예상 유동 인구 조회 (24시간)
export const getPredict = async (code: string) => {
	return await axiosInstanceFlask.post("/predict", {
		행정동코드: code,
	});
};

// 카테고리별 예약 인구 비율 조회 (TOP5)
