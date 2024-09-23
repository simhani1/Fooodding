import { UserTruckProps } from "@interface/foodTruck";
import { useNavigate } from "react-router-dom";

const UserTruck: React.FC<UserTruckProps> = ({ truck }) => {
	const nav = useNavigate();

	if (!truck) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="pt-12 text-xl font-bold">주변에 푸드트럭이 없습니다.</p>
			</div>
		);
	}

	return (
		<div
			className="flex flex-row items-center p-2 m-2"
			onClick={() => nav("/user/foodtruck")}
		>
			<img
				src={truck.img}
				alt="푸드트럭 음식사진"
				className="object-cover m-4 w-28 h-28"
			/>
			<div>
				<h3>{truck.name}</h3>
				<p>{truck.content}</p>

				{truck.menu.length <= 1 ? (
					<div>
						<p># {truck.menu[0]}</p>
					</div>
				) : (
					<div>
						<p># {truck.menu[0]}</p>
						<p># {truck.menu[1]}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserTruck;
