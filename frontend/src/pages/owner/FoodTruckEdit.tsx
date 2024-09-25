import FoodTruckFormContainer from "@components/owner/FoodTruckFormContainer";

const FoodTruckEdit = () => {
	const editFoodTruck = () => {};

	return (
		<FoodTruckFormContainer
			title="푸드트럭 정보 수정"
			buttonText="수정 완료"
			onSubmit={editFoodTruck}
		/>
	);
};

export default FoodTruckEdit;
