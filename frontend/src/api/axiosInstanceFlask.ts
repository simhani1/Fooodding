import axios from "axios";

import { ContentType } from "@interface/api";

const axiosInstanceFlask = axios.create({
	baseURL: import.meta.env.VITE_FLASK_URL,
	headers: {
		"Content-Type": ContentType.Json,
	},
	withCredentials: true,
});

axiosInstanceFlask.interceptors.request.use(
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

export default axiosInstanceFlask;
