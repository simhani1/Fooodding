import { ApiResponse, INaverLoginDTO, INaverLoginResponseDTO, IReissueResponseDTO, Role } from "@interface/api";
import axiosInstance from "@api/axiosInstance";
import useAuthStore from "@store/authStore";

const { role } = useAuthStore();
const path = role === Role.USER ? "/users" : "/owners";

export const reissue = (): ApiResponse<IReissueResponseDTO> => {
	return axiosInstance.post(`${path}/reissue`, { role });
};

export const logout = (path: string) => {
	return axiosInstance.post(`${path}/logout`);
};

export const loginNaver = (path: string, dto: INaverLoginDTO): ApiResponse<INaverLoginResponseDTO> => {
	return axiosInstance.post(`${path}/login/naver`, {
		dto,
	});
};

export const withdraw = (path: string) => {
	return axiosInstance.patch(`${path}/withdraw`);
};
