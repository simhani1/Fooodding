import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

import { registerFoodTruck } from "@api/food-truck-api";
import { IFoodTruckDTO } from "@interface/api";
import useFoodTruckStore from "@store/foodTruckStore";

const FoodTruckCreate = () => {
	const nav = useNavigate();
	const { updateAll } = useFoodTruckStore();
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
				const foodTruckId = data.data.foodTruckId;
				updateAll({ ...formData, foodTruckId });
			}
		} catch (error) {
		} finally {
			nav("/owner/foodtruck");
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
