import { useState } from "react";

import Title from "@components/common/Title";
import Background from "@components/owner/Background";
import FoodTruck from "@components/owner/FoodTruck";
import FoodTruckEdit from "@components/owner/FoodTruckEdit";
import useFoodTruckStore from "@store/foodTruckStore";
import FoodTruckCreate from "@components/owner/FoodTruckCreate";

const OwnerFoodTruck = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { name, licenseNumber, introduction, category } = useFoodTruckStore();
	const isExist = name && licenseNumber && introduction && category;

	const handleEditing = () => {
		setIsEditing((prev) => !prev);
	};

	if (isExist) {
		return (
			<Background>
				<>
					<div className="flex justify-between mb-10">
						<Title title="푸드트럭 정보 관리" />
						<button
							className="text-3xl"
							onClick={handleEditing}
						>
							{isEditing ? "취소" : "수정"}
						</button>
					</div>
					{isEditing ? <FoodTruckEdit onSubmit={handleEditing} /> : <FoodTruck />}
				</>
			</Background>
		);
	}
	return (
		<Background>
			<>
				<div className="flex justify-between mb-10">
					<Title title="푸드트럭 정보 관리" />
				</div>
				<FoodTruckCreate onSubmit={handleEditing} />
			</>
		</Background>
	);
};

export default OwnerFoodTruck;
