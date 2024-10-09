import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import TextField from "@components/common/TextField";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import OwnerException from "@components/owner/OwnerException";

import { getOwnerFoodTruck } from "@api/food-truck-api";
import { categories } from "@utils/foodTruckData";
import useFoodTruckApi from "@hooks/useFoodTruckApi";

const OwnerFoodTruck = () => {
	const nav = useNavigate();

	const { isOpen, isLoading, isError, data } = useFoodTruckApi(getOwnerFoodTruck);
	const foodTruckInfo = data?.data;

	const title = "푸드트럭 정보 관리";

	if (isLoading) {
		return (
			<OwnerException
				title={title}
				content="불러오는 중..."
			/>
		);
	}

	if (isOpen) {
		return (
			<OwnerException
				title={title}
				content="장사중인 푸드트럭은 수정할 수 없습니다."
			/>
		);
	}

	if (isError) {
		return (
			<OwnerException
				title={title}
				content="데이터를 불러오는 데 실패하였습니다."
			/>
		);
	}

	console.log(foodTruckInfo);

	if (!foodTruckInfo) {
		return (
			<Container>
				<Main>
					<div className="flex flex-col justify-center h-screen gap-10">
						<h4 className="text-3xl text-center">아직 푸드트럭을 등록하지 않았어요.</h4>
						<button
							className="h-16 mx-auto text-2xl text-white w-96 bg-gradient-to-r from-main to-boss rounded-xl"
							onClick={() => nav("/owners/foodtruck/create")}
						>
							푸드트럭 등록하기
						</button>
					</div>
				</Main>
			</Container>
		);
	}

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<Title title={title} />
						<button
							className="text-3xl"
							onClick={() =>
								nav("/owners/foodtruck/edit", {
									state: {
										...foodTruckInfo,
									},
								})
							}
						>
							수정
						</button>
					</div>
					<TextField
						label={"상호명"}
						value={foodTruckInfo.name}
					/>
					<TextField
						label={"사업자 등록번호"}
						value={foodTruckInfo.licenseNumber}
					/>
					<TextField
						label={"소개글"}
						value={foodTruckInfo.introduction}
					/>
					<TextField
						label={"카테고리"}
						value={categories[foodTruckInfo.category]}
					/>
				</>
			</Main>
		</Container>
	);
};

export default OwnerFoodTruck;
