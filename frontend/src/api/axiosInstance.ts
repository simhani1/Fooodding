import axios from "axios";

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
		const accessToken = localStorage.getItem("token");
		if (accessToken) {
			config.headers.Authorization = `${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
