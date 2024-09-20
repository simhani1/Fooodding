import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import FoodTruckForm from "@components/owner/FoodTruckForm";
import Main from "@components/owner/Main";

const FoodTruckCreate = () => {
	const nav = useNavigate();

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<Title title="푸드트럭 정보 등록" />
						<button
							className="text-3xl"
							onClick={() => nav("/owner/foodtruck")}
						>
							취소
						</button>
					</div>
					<FoodTruckForm
						buttonText="등록"
						onSubmit={() => {}}
					/>
				</>
			</Main>
		</Container>
	);
};

export default FoodTruckCreate;
