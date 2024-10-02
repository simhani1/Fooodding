import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import TextField from "@components/common/TextField";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";

import useFoodTruckStore from "@store/foodTruckStore";
import { getFoodTruck } from "@api/food-truck-api";
import { categories } from "@utils/foodTruckData";

const OwnerFoodTruck = () => {
	const nav = useNavigate();
	const { name, licenseNumber, introduction, category, foodTruckId, updateAll } = useFoodTruckStore();

	useEffect(() => {
		const load = async () => {
			if (foodTruckId) {
				const { data } = await getFoodTruck(foodTruckId);
				if (data.isSuccess) {
					updateAll({ ...data.data, foodTruckId });
				}
			}
		};

		load();
	}, []);

	return (
		<Container>
			{foodTruckId ? (
				<Main>
					<>
						<div className="flex justify-between">
							<Title title="푸드트럭 정보 관리" />
							<button
								className="text-3xl"
								onClick={() => nav("/owners/foodtruck/edit")}
							>
								수정
							</button>
						</div>
						<TextField
							label={"상호명"}
							value={name}
						/>
						<TextField
							label={"사업자 등록번호"}
							value={licenseNumber}
						/>
						<TextField
							label={"소개글"}
							value={introduction}
						/>
						<TextField
							label={"카테고리"}
							value={categories[category]}
						/>
					</>
				</Main>
			) : (
				<div className="flex flex-col justify-center h-screen gap-10">
					<h4 className="text-3xl text-center">아직 푸드트럭을 등록하지 않았어요.</h4>
					<button
						className="h-16 mx-auto text-2xl text-white w-96 bg-gradient-to-r from-main to-boss rounded-xl"
						onClick={() => nav("/owners/foodtruck/create")}
					>
						푸드트럭 등록하기
					</button>
				</div>
			)}
		</Container>
	);
};

export default OwnerFoodTruck;
