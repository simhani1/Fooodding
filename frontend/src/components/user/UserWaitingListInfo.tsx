import { IWaitingProps } from "@interface/waiting";

const UserWaitingListInfo = ({ waitingInfo }: IWaitingProps) => {
	return (
		<div
			className={`flex flex-row items-center mx-8 my-4 border-solid rounded-lg w-5/6 h-1/6 ${
				waitingInfo.isOrdering ? "border-2 border-main" : "border-2 border-user"
			}`}
		>
			<p
				className={`flex z-10 items-center justify-center py-[2em] px-[1em] h-full mr-4 text-xl font-semibold text-white rounded-md border-2 border-solid ${waitingInfo.isOrdering ? "bg-main border-main" : "bg-user border-user"}`}
			>
				{waitingInfo.waitingNumber} 번
			</p>

			<div className="flex flex-col justify-center h-full m-4">
				<p className="my-1 text-lg font-semibold">{waitingInfo.name}</p>

				{waitingInfo.isOrdering ? (
					<div className="flex items-center my-1">
						<p className="font-bold text-md text-main">몇 시</p>
						<p className="font-light text-md">까지 와주세요!</p>
					</div>
				) : (
					<p className="font-light text-md">잠시만 기다려주세요</p>
				)}
			</div>
		</div>
	);
};

export default UserWaitingListInfo;
