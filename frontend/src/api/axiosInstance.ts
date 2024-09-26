import axios from "axios";
import useAuthStore, { initialState } from "@store/authStore";
import { reissue } from "@api/auth-api";
import { ContentType } from "@interface/api";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-Type": ContentType.Json,
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuthStore.getState();
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

		if (!data.isSuccess) {
			const { data } = await reissue();
			if (data.isSuccess && data.data.accessToken) {
				const accessToken = data.data.accessToken;
				useAuthStore.setState({ accessToken });
				return axiosInstance(config);
			}
			useAuthStore.setState({ ...initialState });
		}
		return response;
	},
	async (error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

export default axiosInstance;
