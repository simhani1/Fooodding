import { useEffect, useState } from "react";

import { ITruckWaitingInfo } from "@interface/foodTruck";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import UserWaitingListInfo from "@components/user/UserWaitingListInfo";
import { getMyWaitingList } from "@api/waiting-api";

import { FireTruck } from "@phosphor-icons/react";
import { changeNotificationToken, saveNotificationToken } from "@api/fcm-api";

const UserWaitingList = () => {
	const [waitingList, setWaitingList] = useState<ITruckWaitingInfo[]>([
		{
			waitingId: 0,
			number: 0,
			foodTruckName: "",
			foodTruckId: 0,
		},
	]);

	const [isToggled, setIsToggled] = useState("");

	const getMyList = async () => {
		try {
			const response = await getMyWaitingList();
			const data = response.data?.data;

			// waitingList와 tokenStatus를 각각 설정
			setWaitingList(data.userWaitingInfo); // 푸드트럭 대기 리스트 설정
			setIsToggled(data.tokenStatus); // tokenStatus 설정
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getMyList();
	}, []);

	// 토글 버튼 클릭해서 토큰 상태 변경
	const handleToggle = async () => {
		if (isToggled === "NONE") {
			const token = sessionStorage.getItem("fcmToken");
			saveNotificationToken(token || "");
			console.log(isToggled);
			setIsToggled("ACTIVE");
		} else {
			if (isToggled === "ACTIVE") {
				changeNotificationToken();
				setIsToggled("INACTVIE");
			} else if (isToggled === "INACTVIE") {
				changeNotificationToken();
				setIsToggled("ACTIVE");
			}
		}
	};

	return (
		<>
			<TheHeader />
			<div className="flex flex-col items-center m-6">
				<h1 className="m-4 text-2xl font-extrabold">현재 나의 예약 현황</h1>
			</div>

			<div className="flex items-center justify-between gap-2 px-10">
				<div />
				<div className="flex gap-4">
					<span className="text-lg font-medium">알림 설정</span>
					<div className="flex items-center gap-3">
						<div
							onClick={handleToggle}
							className={`w-12 h-6 flex items-center bg-${
								isToggled === "ACTIVE" ? "boss" : "gray"
							} rounded-full p-1 cursor-pointer transition-colors duration-300`}
						>
							<div
								className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
									isToggled === "ACTIVE" ? "translate-x-0" : "translate-x-6"
								}`}
							></div>
						</div>
					</div>
				</div>
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
							foodTruckId={waiting.foodTruckId}
						/>
					))
				)}
			</div>

			<TheFooter />
		</>
	);
};

export default UserWaitingList;
