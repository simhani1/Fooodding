import { ApiResponse, INaverLoginDTO, INaverLoginResponseDTO, IReissueResponseDTO } from "@interface/api";
import { ObjectType } from "@interface/common";
import axiosInstance from "@api/axiosInstance";
import useAuthStore from "@store/authStore";

const { role } = useAuthStore.getState();

const basePath = `/members/auth`;

const path: ObjectType<string> = {
	OWNER: "/owners",
	USER: "/users",
};

export const reissue = (): ApiResponse<IReissueResponseDTO> => {
	return axiosInstance.post(`${basePath}${path[role]}/reissue`, { role });
};

export const logout = () => {
	return axiosInstance.post(`${basePath}${path[role]}/logout`);
};

export const loginNaver = (dto: INaverLoginDTO): ApiResponse<INaverLoginResponseDTO> => {
	return axiosInstance.post(`${basePath}${path[dto.role]}/login/naver`, dto);
};

export const withdraw = () => {
	return axiosInstance.patch(`${basePath}${path}/withdraw`);
};
