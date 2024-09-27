import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import FoodTruckForm from "@components/owner/FoodTruckForm";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";

const OwnerEdit = () => {
	const nav = useNavigate();

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<Title title="푸드트럭 정보 수정" />
						<button
							className="text-3xl"
							onClick={() => nav("/owner/foodtruck")}
						>
							취소
						</button>
					</div>
					<FoodTruckForm
						buttonText="수정 완료"
						onSubmit={() => {}}
					/>
				</>
			</Main>
		</Container>
	);
};

export default OwnerEdit;
