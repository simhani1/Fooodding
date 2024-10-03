import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import UserWaitingListInfo from "@components/user/UserWaitingListInfo";
import { ITruckInfoDetail } from "@interface/foodTruck";
import { FireTruck } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const UserWaitingList = () => {
	const [waitingList, setWaitingList] = useState<ITruckInfoDetail[]>([
		{
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
				rank: 0, //내 앞에 몇 명
				changedAt: 0,
			}, //웨이팅정보
		},
	]);

	useEffect(() => {
		//여기에서 axios 연결

		setWaitingList([]);
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
							key={waiting.waitingInfo.waitingId}
							waitingInfo={waiting.waitingInfo}
							foodTruckName={waiting.name}
						/>
					))
				)}
			</div>

			<TheFooter />
		</>
	);
};

export default UserWaitingList;
