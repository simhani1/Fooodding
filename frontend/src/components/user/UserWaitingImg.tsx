import { UserWaitingImgProps } from "@interface/waiting";

const UserWaitingImg = ({ isCancelable }: UserWaitingImgProps) => {
	return (
		<>
			<div className="w-full max-w-sm m-4 border-t-2 border-dashed border-gray"></div> {/* 점선 */}
			{/* 선과 원을 위한 컨테이너 */}
			<div className="relative flex items-center justify-between w-full max-w-sm my-4">
				{/* 첫 번째 선 (예약 신청 ~ 줄서는 중) */}
				<div className="absolute top-[calc(0.75rem)] left-[calc(1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 bg-user"></div>

				{/* 두 번째 선 (줄서는 중 ~ 주문 대기) */}
				<div
					className={`absolute top-[calc(0.75rem)] left-[calc(42%+1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 ${
						isCancelable ? "bg-gray" : "bg-user"
					}`}
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
					<div className={`w-6 h-6 mb-2 rounded-full ${isCancelable ? "bg-gray" : "bg-user"}`}></div>
					<p className="text-sm font-semibold">주문 대기</p>
				</div>
			</div>
		</>
	);
};

export default UserWaitingImg;
