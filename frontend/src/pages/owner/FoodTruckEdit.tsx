import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

import { IFoodTruckDTO } from "@interface/api";
import { updateFoodTruck } from "@api/food-truck-api";
import useFoodTruckStore from "@store/foodTruckStore";

const FoodTruckEdit = () => {
	const nav = useNavigate();

	const { name, licenseNumber, introduction, category, foodTruckId, updateAll } = useFoodTruckStore();

	const [formData, setFormData] = useState<IFoodTruckDTO>({
		name,
		licenseNumber,
		introduction,
		category,
	});

	const editFoodTruck = async () => {
		try {
			const { data } = await updateFoodTruck(foodTruckId, {
				...formData,
			});
			if (data.isSuccess) {
				updateAll({ ...formData, foodTruckId });
			}
		} catch (error) {
		} finally {
			nav("/owner/foodtruck");
		}
	};

	return (
		<FoodTruckFormContainer
			title="푸드트럭 정보 수정"
			buttonText="수정 완료"
			formData={formData}
			setFormData={setFormData}
			onSubmit={editFoodTruck}
		/>
	);
};

export default FoodTruckEdit;
