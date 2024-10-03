import { UserTruckProps } from "@interface/foodTruck";
import { useNavigate } from "react-router-dom";

const UserTruck: React.FC<UserTruckProps> = ({ truck }) => {
	const nav = useNavigate();
	const truckId = truck?.foodTruckId;

	if (!truck) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="pt-12 text-xl font-bold">주변에 푸드트럭이 없습니다.</p>
			</div>
		);
	}

	return (
		<div
			className="flex flex-row items-center p-2 m-4 border border-solid w-96 border-gray rounded-2xl"
			onClick={() => nav("/users/foodtruck", { state: truckId })}
		>
			<img
				src={truck.img}
				alt="푸드트럭 음식사진"
				className="object-cover m-2 rounded-md w-28 h-28"
			/>

			<div className="flex flex-col ml-2 mr-4">
				<h3 className="my-1 text-lg font-bold">{truck.name}</h3>
				<p className="text-sm font-light ">{truck.content}</p>

				{truck.menu.length <= 1 ? (
					<div>
						<p className="p-2 text-white rounded-md text-s bg-user">#{truck.menu[0]}</p>
					</div>
				) : (
					<div className="flex gap-2 my-2">
						<p className="p-2 text-xs text-white rounded-md bg-user">#{truck.menu[0]}</p>
						<p className="p-2 text-xs text-white rounded-md bg-user">#{truck.menu[1]}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserTruck;
