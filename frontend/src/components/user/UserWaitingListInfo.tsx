import { IWaitingProps } from "@interface/waiting";

const UserWaitingListInfo = ({ number, foodTruckName }: IWaitingProps) => {
	return (
		<div className="flex flex-row items-center w-5/6 mx-8 my-4 border-2 border-solid rounded-lg h-1/6 border-user">
			<p className="flex z-10 items-center justify-center py-[2em] px-[1em] h-full mr-4 text-xl font-semibold text-white rounded-md border-2 border-solid bg-main border-main">
				{number} 번
			</p>

			<div className="flex flex-col justify-center h-full m-4">
				<p className="my-1 text-lg font-semibold">{foodTruckName}</p>
			</div>
		</div>
	);
};

export default UserWaitingListInfo;
