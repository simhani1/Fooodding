// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { ITruckInfoDetail } from "@interface/foodTruck";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";

import { Ticket } from "@phosphor-icons/react";
import UserMenu from "@components/user/UserMenu";
import { useNavigate } from "react-router-dom";

const UserFoodTruck = () => {
	const nav = useNavigate();
	// const location = useLocation();
	// const truckId = location.state.truckId;

	const [truck, setTruck] = useState<ITruckInfoDetail>({
		id: 0,
		name: "",
		content: "",
		img: "",
		menuList: [],
	});

	useEffect(() => {
		//여기에서 axios 연결

		setTruck({
			id: 1,
			name: "유니네 오꼬노미야끼",
			content: "싸피인들 오꼬노미야끼 한입 고?",
			img: "https://recipe1.ezmember.co.kr/cache/recipe/2015/09/30/9f010965c00c8edd4439e0d1e359c7fe.jpg",
			menuList: [
				{
					menuName: "오꼬노미야끼",
					price: 8000,
					menuImg: "DEFAULT",
				},
				{
					menuName: "야끼소바",
					price: 12000,
					menuImg:
						"https://recipe1.ezmember.co.kr/cache/recipe/2015/09/30/9f010965c00c8edd4439e0d1e359c7fe.jpg",
				},
			],
		});
	}, []);

	return (
		<>
			<TheHeader />

			<div className="flex flex-col items-center p-6 m-8 border border-solid rounded-xl border-gray">
				<h1 className="mb-2 text-2xl font-extrabold">{truck.name}</h1>
				<h3 className="mb-4 text-lg">{truck.content}</h3>
				<button
					className="flex flex-row items-center px-4 py-3 rounded-md bg-user"
					onClick={() => nav("/user/waiting")}
				>
					<Ticket
						size={21}
						weight="fill"
						className="mx-1 text-white"
					/>
					<span className="mx-1 font-semibold text-white">예약하기</span>
				</button>
			</div>

			<UserMenu menuList={truck.menuList} />

			<TheFooter />
		</>
	);
};

export default UserFoodTruck;
