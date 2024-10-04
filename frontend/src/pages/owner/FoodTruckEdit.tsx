import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

import { IFoodTruckDTO } from "@interface/api";
import { updateFoodTruck } from "@api/food-truck-api";

const FoodTruckEdit = () => {
	const nav = useNavigate();
	const location = useLocation();

	const { foodTruckId, name, licenseNumber, introduction, category } = location.state;

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
				alert("푸드트럭 정보 수정 완료");
			}
		} catch (error) {
			alert("푸드트럭 정보 수정 실패");
		} finally {
			nav("/owners/foodtruck");
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
