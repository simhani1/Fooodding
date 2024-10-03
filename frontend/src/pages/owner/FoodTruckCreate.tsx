import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

import { registerFoodTruck } from "@api/food-truck-api";
import { IFoodTruckDTO } from "@interface/api";

const FoodTruckCreate = () => {
	const nav = useNavigate();

	const [formData, setFormData] = useState<IFoodTruckDTO>({
		name: "",
		licenseNumber: "",
		introduction: "",
		category: "KOREAN",
	});

	const createFoodTruck = async () => {
		try {
			const { data } = await registerFoodTruck({
				...formData,
			});

			if (data.isSuccess) {
				alert("푸드트럭 정보 등록 성공");
			}
		} catch (error) {
			alert("푸드트럭이 등록 실패");
		} finally {
			nav("/owners/foodtruck");
		}
	};

	return (
		<FoodTruckFormContainer
			title="푸드트럭 정보 등록"
			buttonText="등록"
			formData={formData}
			setFormData={setFormData}
			onSubmit={createFoodTruck}
		/>
	);
};

export default FoodTruckCreate;
