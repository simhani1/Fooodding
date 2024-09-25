import { useEffect, useState } from "react";

import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import UserTruckInfo from "@components/user/UserTruckInfo";
import UserWaitingInfo from "@components/user/UserWaitingInfo";
import { IWaitingInfo } from "@interface/waiting";

const UserWaiting = () => {
	const [waitingTruck, setWaitingTruck] = useState({
		id: 0,
		name: "",
		content: "",
		isReserved: false,
	});

	const [waitingInfo, setWaitingInfo] = useState<IWaitingInfo>({
		id: 0,
		name: "",
		waitingNumber: 0,
		peopleNumber: 0,
		isWaiting: false,
		isOrdering: false,
	});

	useEffect(() => {
		//여기에서 axios 연결
		setWaitingTruck({
			id: 123,
			name: "유니네 오꼬노미야끼",
			content: "싸피인들 오꼬노미야끼 한입 고?",
			isReserved: true,
		});

		setWaitingInfo({
			id: 123,
			name: "",
			waitingNumber: 286,
			peopleNumber: 7,
			isWaiting: true,
			isOrdering: false,
		});
	}, []);

	return (
		<>
			<TheHeader />

			<UserTruckInfo truck={waitingTruck} />
			<UserWaitingInfo waitingInfo={waitingInfo} />

			<TheFooter />
		</>
	);
};

export default UserWaiting;
