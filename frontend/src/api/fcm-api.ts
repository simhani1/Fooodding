import axiosInstance from "@api/axiosInstance";

const path = "/fcm";

// 공고 관련 FCM 토큰 저장
export const saveNotificationToken = (token: string) => {
	console.log(token);
	return axiosInstance.post(`${path}/token`, {
		token: token,
	});
};

// 공고 관련 FCM 토큰 삭제
export const removeNotificationToken = () => {
	return axiosInstance.delete(`${path}/token`);
};
