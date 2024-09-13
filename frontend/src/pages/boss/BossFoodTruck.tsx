import { useState } from "react";

import Title from "@components/common/Title";
import Background from "@components/boss/Background";
import FoodTruck from "@components/boss/FoodTruck";
import FoodTruckEdit from "@components/boss/FoodTruckEdit";
import useFoodTruckStore from "@store/foodTruckStore";
import FoodTruckCreate from "@components/boss/FoodTruckCreate";

const BossFoodTruck = () => {
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

export default BossFoodTruck;
