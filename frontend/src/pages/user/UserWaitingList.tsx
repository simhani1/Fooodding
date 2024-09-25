import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import UserWaitingListInfo from "@components/user/UserWaitingListInfo";
import { IWaitingInfo } from "@interface/waiting";
import { useEffect, useState } from "react";

const UserWaitingList = () => {
	const today = new Date();
	const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

	const [waitingList, setWaitingList] = useState<IWaitingInfo[]>([
		{
			id: 0,
			name: "",
			waitingNumber: 0,
			peopleNumber: 0,
			isWaiting: true,
			isOrdering: false,
		},
	]);

	useEffect(() => {
		//여기에서 axios 연결

		setWaitingList([
			{
				id: 123,
				name: "종한이네 왕새우꼬치",
				waitingNumber: 286,
				peopleNumber: 7,
				isWaiting: true,
				isOrdering: true,
			},
			{
				id: 345,
				name: "도은이네 오꼬노미야끼",
				waitingNumber: 286,
				peopleNumber: 7,
				isWaiting: true,
				isOrdering: false,
			},
			{
				id: 456,
				name: "윤이네 딤섬",
				waitingNumber: 286,
				peopleNumber: 7,
				isWaiting: true,
				isOrdering: false,
			},
		]);
	}, []);

	return (
		<>
			<TheHeader />
			<div className="flex flex-col items-center m-6">
				<h1 className="m-4 text-2xl font-extrabold">오늘의 예약 현황</h1>
				<p className="font-medium text-md">{formattedDate}</p>
			</div>

			<div className="flex flex-col items-center">
				{waitingList.map((waitingInfo) => (
					<UserWaitingListInfo
						key={waitingInfo.id}
						waitingInfo={waitingInfo}
					/>
				))}
			</div>

			<TheFooter />
		</>
	);
};

export default UserWaitingList;
