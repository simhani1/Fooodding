import { useEffect, useState } from "react";

import { ITruckWaitingInfo } from "@interface/foodTruck";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import UserWaitingListInfo from "@components/user/UserWaitingListInfo";
import { getMyWaitingList } from "@api/waiting-api";

import { FireTruck } from "@phosphor-icons/react";

const UserWaitingList = () => {
	const [waitingList, setWaitingList] = useState<ITruckWaitingInfo[]>([
		{
			waitingId: 0,
			number: 0,
			foodTruckName: "",
		},
	]);

	const getMyList = async () => {
		try {
			const response = await getMyWaitingList();
			setWaitingList(response.data?.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		//여기에서 axios 연결
		getMyList();
	}, []);

	return (
		<>
			<TheHeader />
			<div className="flex flex-col items-center m-6">
				<h1 className="m-4 text-2xl font-extrabold">현재 나의 예약 현황</h1>
			</div>

			<div className="flex flex-col items-center">
				{waitingList.length === 0 ? (
					<>
						<FireTruck
							className="my-10 text-user"
							size={100}
						/>
						<p className="my-4 text-lg font-bold">현재 예약 중인 푸드트럭이 없습니다.</p>
					</>
				) : (
					waitingList.map((waiting) => (
						<UserWaitingListInfo
							key={waiting.waitingId}
							number={waiting.number}
							foodTruckName={waiting.foodTruckName}
						/>
					))
				)}
			</div>

			<TheFooter />
		</>
	);
};

export default UserWaitingList;
