import { ITruckInfoProps } from "@interface/foodTruck";
import { reserveTruckWaiting } from "@api/waiting-api";

import { Ticket } from "@phosphor-icons/react";

const UserTruckInfo = ({ truck, setTruck }: ITruckInfoProps) => {
	// const foodTruckId = truck.foodTruckId;
	const foodTruckId = 1;

	//예약하기 눌렀을 떄
	const reserveTruck = async () => {
		//axios를 쏘고 나서
		try {
			await reserveTruckWaiting(foodTruckId);

			// 예약 성공 시 `isReserved` 상태 업데이트
			setTruck((prevState) => ({
				...prevState,
				isReserved: true,
			}));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex flex-col items-center p-6 m-8 border border-solid rounded-xl border-gray">
			<h1 className="mb-2 text-2xl font-extrabold">{truck.name}</h1>
			<h3 className="mb-4 text-lg">{truck.introduction}</h3>
			<button
				className={`flex flex-row items-center px-4 py-3 rounded-md ${
					truck.isReserved ? "bg-gray" : "bg-user"
				}`}
				onClick={reserveTruck}
				disabled={truck.isReserved}
			>
				<Ticket
					size={21}
					weight="fill"
					className="mx-1 text-white"
				/>
				<span className="mx-1 font-semibold text-white">{truck.isReserved ? "예약 중" : "예약하기"}</span>
			</button>
		</div>
	);
};

export default UserTruckInfo;
