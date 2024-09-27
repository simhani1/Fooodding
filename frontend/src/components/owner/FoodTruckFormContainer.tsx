import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import FoodTruckForm from "@components/owner/FoodTruckForm";
import { IFormContainer } from "@interface/owner";

const FoodTruckFormContainer = ({ title, buttonText, onSubmit }: IFormContainer) => {
	const nav = useNavigate();

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<Title title={title} />
						<button
							className="text-3xl"
							onClick={() => nav("/owner/foodtruck")}
						>
							취소
						</button>
					</div>
					<FoodTruckForm
						buttonText={buttonText}
						onSubmit={onSubmit}
					/>
				</>
			</Main>
		</Container>
	);
};

export default FoodTruckFormContainer;
