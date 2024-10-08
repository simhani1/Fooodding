import {
	ApiResponse,
	INaverLoginDTO,
	INaverLoginResponseDTO,
	INoResponseDTO,
	IReissueResponseDTO,
	IUserInfo,
	RoleParam,
} from "@interface/api";
import axiosInstance from "@api/axiosInstance";

const basePath = `/members/auth`;

const OWNER = "owners";
const USER = "users";

const reissue = (role: RoleParam): ApiResponse<IReissueResponseDTO> => {
	return axiosInstance.post(`${basePath}/${role}/reissue`);
};

const logout = (role: RoleParam) => {
	return axiosInstance.post(`${basePath}/${role}/logout`);
};

const loginNaver = (role: RoleParam, dto: INaverLoginDTO): ApiResponse<INaverLoginResponseDTO> => {
	return axiosInstance.post(`${basePath}/${role}/login/naver`, dto);
};

const withdraw = (role: RoleParam) => {
	return axiosInstance.patch(`${basePath}/${role}/withdraw`);
};

// owner
export const ownerReissue = (): ApiResponse<IReissueResponseDTO> => {
	return reissue(OWNER);
};

export const ownerLogout = () => {
	return logout(OWNER);
};

export const ownerLoginNaver = (dto: INaverLoginDTO): ApiResponse<INaverLoginResponseDTO> => {
	return loginNaver(OWNER, dto);
};

export const ownerWithdraw = () => {
	return withdraw(OWNER);
};

// user
export const userReissue = (): ApiResponse<IReissueResponseDTO> => {
	return reissue(USER);
};

export const userLogout = () => {
	return logout(USER);
};

export const userLoginNaver = (dto: INaverLoginDTO): ApiResponse<INaverLoginResponseDTO> => {
	return loginNaver(USER, dto);
};

export const userWithdraw = () => {
	return withdraw(USER);
};

//성별연령대
export const userInputInfo = (dto: IUserInfo): ApiResponse<INoResponseDTO> => {
	return axiosInstance.patch(`${basePath}/${USER}`, dto);
};
