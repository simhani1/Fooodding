import axiosInstance from "@api/axiosInstance";

const path = "/fcm";

// 공고 관련 FCM 토큰 저장
export const saveNotificationToken = (token: string) => {
	return axiosInstance.post(`${path}/token`, {
		token: token,
	});
};

// 공고 관련 FCM 토큰 상태 변경
export const changeNotificationToken = () => {
	return axiosInstance.patch(`${path}/token`);
};
