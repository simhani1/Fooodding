import axios from "axios";
import useAuthStore from "@store/authStore";
import { reissue } from "@api/auth-api";
import { ContentType } from "@interface/api";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-Type": ContentType.Json,
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuthStore();
		config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async (response) => {
		const { config, data } = response;
		const { updateAccessToken, reset } = useAuthStore();

		if (!data.isSuccess) {
			const { data } = await reissue();
			if (data.isSuccess && data.data.accessToken) {
				const accessToken = data.data.accessToken;
				updateAccessToken(accessToken);
				return axiosInstance(config);
			}
			reset();
		}
		return response;
	},
	async (error) => {
		console.log(error);
		return new Promise(() => {});
	},
);

export default axiosInstance;
