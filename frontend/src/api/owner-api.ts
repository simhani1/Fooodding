import { ApiResponse, IOwnerAnnouncementResponseDTO } from "@interface/api";
import axiosInstance from "@api/axiosInstance";

const path = "/announcement";

// 공고 목록 조회
export const getAunnouncementInfo = (): ApiResponse<IOwnerAnnouncementResponseDTO> => {
	return axiosInstance.get(`${path}`);
};

// 공고 조회 로그 생성 (이 부분 requestBody 구성 및 isSuccess가 뭔지 물어봐야함)
export const createAnnounementLog = (announcementId: number) => {
	return axiosInstance.post(`${path}/${announcementId}/open`);
};
