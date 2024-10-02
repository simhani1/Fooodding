import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import FoodTruckForm from "@components/owner/FoodTruckForm";

import { IFoodTruckForm, IFormContainer } from "@interface/owner";

const FoodTruckFormContainer = ({
	title,
	formData,
	buttonText,
	setFormData,
	onSubmit,
}: IFormContainer & IFoodTruckForm) => {
	const nav = useNavigate();

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<Title title={title} />
						<button
							className="text-3xl"
							onClick={() => nav("/owners/foodtruck")}
						>
							취소
						</button>
					</div>
					<FoodTruckForm
						buttonText={buttonText}
						formData={formData}
						onSubmit={onSubmit}
						setFormData={setFormData}
					/>
				</>
			</Main>
		</Container>
	);
};

export default FoodTruckFormContainer;
