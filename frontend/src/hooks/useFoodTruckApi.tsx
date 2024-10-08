import { useEffect, useState } from "react";

import { ApiResponse, IFoodTruckApiResponse } from "@interface/api";
import { isCustomAxiosError } from "@api/error";

const useFoodTruckApi = <T extends IFoodTruckApiResponse>(apiFn: () => ApiResponse<T>) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const load = async () => {
			try {
				const { data } = await apiFn();
				if (data.isSuccess) {
					setData(data);
				}
			} catch (error) {
				if (isCustomAxiosError(error) && error.response && error.response.data) {
					const { code } = error.response?.data;
					const status = error.response.status;
					if (code === "6001") {
						setIsOpen(true);
						return;
					}
					if (status === 500) {
						setIsError(true);
					}
				}
			} finally {
				setIsLoading(false);
			}
		};

		load();
	}, []);

	return { isOpen, isLoading, isError, data };
};

export default useFoodTruckApi;
