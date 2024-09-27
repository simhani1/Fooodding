import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

const FoodTruckCreate = () => {
	const createFoodTruck = () => {};

	return (
		<FoodTruckFormContainer
			title="푸드트럭 정보 등록"
			buttonText="등록"
			onSubmit={createFoodTruck}
		/>
	);
};

export default FoodTruckCreate;
