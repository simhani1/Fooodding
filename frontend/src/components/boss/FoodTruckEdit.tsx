import FoodTruckForm from "@components/boss/FoodTruckForm";

import { IFoodTruckForm } from "@interface/foodTruck";

const FoodTruckEdit = ({ onSubmit }: IFoodTruckForm) => {
	return (
		<FoodTruckForm onSubmit={onSubmit}>
			<span>수정 완료</span>
		</FoodTruckForm>
	);
};

export default FoodTruckEdit;
