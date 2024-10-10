import { IWaitingProps } from "@interface/waiting";
import { useNavigate } from "react-router-dom";

const UserWaitingListInfo = ({ number, foodTruckName, foodTruckId }: IWaitingProps) => {
	const nav = useNavigate();

	return (
		<div
			onClick={() => nav("/users/foodtruck", { state: foodTruckId })}
			className="flex flex-row items-center w-5/6 mx-8 my-4 border-2 border-solid rounded-lg h-1/6 border-user"
		>
			<p className="flex z-10 items-center justify-center py-[2em] px-[1em] h-full mr-4 text-xl font-semibold text-white rounded-md border-2 border-solid bg-user border-user">
				{number} 번
			</p>

			<div className="flex flex-col justify-center h-full m-4">
				<p className="my-1 text-lg font-semibold">{foodTruckName}</p>
			</div>
		</div>
	);
};

export default UserWaitingListInfo;
