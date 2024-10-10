import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { ITruckInfoDetail } from "@interface/foodTruck";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";

import UserMenu from "@components/user/UserMenu";
import UserTruckInfo from "@components/user/UserTruckInfo";
import { getFoodTruckDetailInfo } from "@api/user-api";
import UserWaiting from "../../components/user/UserWaiting";

const UserFoodTruck = () => {
	const location = useLocation();
	const truckId = location.state;

	const [truck, setTruck] = useState<ITruckInfoDetail>({
		foodTruckId: 0,
		licenseNumber: "",
		name: "",
		introduction: "",
		category: "",
		menuList: [],
		isReserved: false, //예약전인지
		waitingInfo: {
			waitingId: 0,
			isCancelable: true, //취소 가능한지
			number: 0,
			rank: 0,
			changedAt: 0,
		}, //웨이팅정보
	});

	const getTruckDetail = async () => {
		try {
			const response = await getFoodTruckDetailInfo(truckId);
			setTruck(response.data.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getTruckDetail();
	}, [truck.isReserved]);

	return (
		<>
			<TheHeader />

			<UserTruckInfo
				truck={truck}
				setTruck={setTruck}
			/>

			{truck.isReserved && truck.waitingInfo ? (
				<UserWaiting
					waitingInfo={truck.waitingInfo}
					foodTruckId={truck.foodTruckId}
				/>
			) : (
				<UserMenu menuList={truck.menuList} />
			)}

			<TheFooter />
		</>
	);
};

export default UserFoodTruck;
