import { UserTruckProps } from "@interface/foodTruck";

const UserTruck: React.FC<UserTruckProps> = ({ truck }) => {
	if (!truck) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="pt-12 text-xl font-bold">주변에 푸드트럭이 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-row w-24 h-60">
			<img
				src={truck.img}
				alt="푸드트럭 음식사진"
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
