// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { ITruckInfoDetail } from "@interface/foodTruck";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";

import UserMenu from "@components/user/UserMenu";
import UserTruckInfo from "@components/user/UserTruckInfo";

const UserFoodTruck = () => {
	// const location = useLocation();
	// const truckId = location.state.truckId;

	const [truck, setTruck] = useState<ITruckInfoDetail>({
		id: 0,
		name: "",
		content: "",
		isReserved: false,
		img: "",
		menuList: [],
	});

	useEffect(() => {
		//여기에서 axios 연결

		setTruck({
			id: 1,
			name: "유니네 오꼬노미야끼",
			content: "싸피인들 오꼬노미야끼 한입 고?",
			isReserved: false,
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
			<UserTruckInfo truck={truck} />
			<UserMenu menuList={truck.menuList} />
			<TheFooter />
		</>
	);
};

export default UserFoodTruck;
