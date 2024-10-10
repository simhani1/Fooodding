import axiosInstance from "./axiosInstance";

// const flaskUrl = import.meta.env.VITE_FLASK_URL;

// 성별 & 연령대 평균 손님 수 조회
export const getWaitingByGenderAge = async () => {
	return await axiosInstance.get("/waiting/log/users");
};

// 요일 & 시간대 평균 손님 수 조회
export const getWaitingByTime = async () => {
	return await axiosInstance.get("/waiting/log/time");
};

// 추천 구역 TOP 10 조회
// export const getRecommend = async (foodtruckId: string) => {
// 	return await axios.post(
// 		`${flaskUrl}/recommend`,
// 		{
// 			foodtruck_id: foodtruckId,
// 		},
// 		{
// 			headers: { "Content-Type": ContentType.Json },
// 			withCredentials: true,
// 		},
// 	);
// };

// 동별 혼잡도 조회
// export const getCongestion = async (): Promise<ICongestionResponseDTO> => {
// 	return await axios.get(`${flaskUrl}/congestion`, {
// 		headers: { "Content-Type": ContentType.Json },
// 		withCredentials: true,
// 	});
// };

// 예상 유동 인구 조회 (24시간)
// export const getPredict = async (code: string) => {
// 	return await axios.post(
// 		`${flaskUrl}/predict`,
// 		{
// 			행정동코드: code,
// 		},
// 		{
// 			headers: { "Content-Type": ContentType.Json },
// 			withCredentials: true,
// 		},
// 	);
// };

// 타겟 예상 유동 인구 조회 (24시간)
// export const getPredictTarget = async (foodtruckId: string) => {
// 	return await axios.post(
// 		`${flaskUrl}/target`,
// 		{
// 			foodtruck_id: foodtruckId,
// 		},
// 		{
// 			headers: { "Content-Type": ContentType.Json },
// 			withCredentials: true,
// 		},
// 	);
// };
