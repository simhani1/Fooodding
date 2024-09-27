import { IWaitingProps } from "@interface/waiting";

import Cooking from "@assets/cooking.gif";

const UserWaitingInfo = ({ waitingInfo }: IWaitingProps) => {
	const { waitingNumber, peopleNumber, isWaiting, isOrdering } = waitingInfo;

	return (
		<div className="flex flex-col items-center p-8 m-8 border-2 border-solid rounded-lg border-user">
			<h2 className="mb-4 text-4xl font-extrabold text-user">{waitingNumber}번</h2>
			<p className="mb-4 text-xl font-bold text-gray">내 앞에 {peopleNumber}명 대기 중</p>

			{/*  점선  */}
			<div className="w-full max-w-sm m-4 border-t-2 border-dashed border-gray"></div>

			{/* 선과 원을 위한 컨테이너 */}
			<div className="relative flex items-center justify-between w-full max-w-sm my-4">
				{/* 첫 번째 선 (예약 신청 ~ 줄서는 중) */}
				<div
					className={`absolute top-[calc(0.75rem)] left-[calc(1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 ${isWaiting || isOrdering ? "bg-user" : "bg-gray"}`}
				></div>

				{/* 두 번째 선 (줄서는 중 ~ 주문 대기) */}
				<div
					className={`absolute top-[calc(0.75rem)] left-[calc(42%+1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 ${isOrdering ? "bg-user" : "bg-gray"}`}
				></div>

				{/* 예약 신청 */}
				<div className="z-10 flex flex-col items-center">
					<div className="w-6 h-6 mb-2 rounded-full bg-user"></div>
					<p className="text-sm font-semibold">예약 신청</p>
				</div>

				{/* 줄서는 중 */}
				<div className="z-10 flex flex-col items-center">
					<div className="w-6 h-6 mb-2 rounded-full bg-user"></div>
					<p className="text-sm font-semibold">줄서는 중</p>
				</div>

				{/* 주문 대기 중 */}
				<div className="z-10 flex flex-col items-center">
					<div className={`w-6 h-6 mb-2 rounded-full ${isOrdering ? "bg-user" : "bg-gray"}`}></div>
					<p className="text-sm font-semibold">주문 대기</p>
				</div>
			</div>

			<img
				className="w-32 h-32 mt-8"
				src={Cooking}
				alt="주문 대기 중입니다"
			/>

			<button className="px-6 py-2 m-8 text-lg font-bold text-white bg-gradient-to-r from-main to-user rounded-xl">
				줄서기 취소
			</button>
		</div>
	);
};

export default UserWaitingInfo;
