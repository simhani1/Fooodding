import { IWaitingProps } from "@interface/waiting";

const UserWaitingListInfo = ({ waitingInfo, foodTruckName }: IWaitingProps) => {
	return (
		<div
			className={`flex flex-row items-center mx-8 my-4 border-solid rounded-lg w-5/6 h-1/6 ${
				waitingInfo.isCancelable ? "border-2 border-user" : "border-2 border-main"
			}`}
		>
			<p
				className={`flex z-10 items-center justify-center py-[2em] px-[1em] h-full mr-4 text-xl font-semibold text-white rounded-md border-2 border-solid ${
					waitingInfo.isCancelable ? "bg-main border-main" : "bg-user border-user"
				}`}
			>
				{waitingInfo.number} 번
			</p>

			<div className="flex flex-col justify-center h-full m-4">
				<p className="my-1 text-lg font-semibold">{foodTruckName}</p>

				{waitingInfo.isCancelable ? (
					<p className="font-light text-md">잠시만 기다려주세요</p>
				) : (
					<div className="flex items-center my-1">
						<p className="font-bold text-md text-main">몇 시</p>
						<p className="font-light text-md">까지 와주세요!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserWaitingListInfo;
