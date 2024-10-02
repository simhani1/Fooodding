import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IWaitingProps } from "@interface/waiting";
import Modal from "@components/common/Modal";
import { waitingCancelingModalStyle } from "@utils/modalStyle";

import Cooking from "@assets/cooking.gif";
import { Ticket } from "@phosphor-icons/react";
import UserOrder from "./UserOrder";

const UserWaitingInfo = ({ waitingInfo }: IWaitingProps) => {
	const nav = useNavigate();

	const { waitingNumber, peopleNumber, isWaiting, isOrdering } = waitingInfo;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [callTime, setCallTime] = useState<string>("00:00:00");

	//주문해주세요로 바뀌면
	useEffect(() => {
		setCallTime("16:37:00");
	}, [isOrdering]);

	// 줄서기 취소 버튼을 눌렀을 때 모달 열기
	const openCancelModal = () => {
		setIsModalOpen(true);
	};

	// 모달 닫기
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// 줄서기 취소 확인
	const confirmCancellation = () => {
		// 여기에서 줄서기 취소 로직 추가
		nav("/users");
		closeModal(); // 모달 닫기
	};

	return (
		<div className="flex flex-col items-center p-8 m-8 border-2 border-solid rounded-lg border-user">
			<h2 className="mb-4 text-4xl font-extrabold text-user">{waitingNumber}번</h2>
			{isOrdering ? (
				<p className="mb-4 font-bold text-black text-opacity-25xl">주문할 시간입니다!</p>
			) : (
				<p className="mb-4 text-xl font-bold text-gray">내 앞에 {peopleNumber}명 대기 중</p>
			)}

			{/*  점선  */}
			<div className="w-full max-w-sm m-4 border-t-2 border-dashed border-gray"></div>

			{/* 선과 원을 위한 컨테이너 */}
			<div className="relative flex items-center justify-between w-full max-w-sm my-4">
				{/* 첫 번째 선 (예약 신청 ~ 줄서는 중) */}
				<div
					className={`absolute top-[calc(0.75rem)] left-[calc(1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 ${
						isWaiting || isOrdering ? "bg-user" : "bg-gray"
					}`}
				></div>

				{/* 두 번째 선 (줄서는 중 ~ 주문 대기) */}
				<div
					className={`absolute top-[calc(0.75rem)] left-[calc(42%+1.5rem)] transform -translate-y-1/2 w-[calc(50%-1.5rem)] h-1 ${
						isOrdering ? "bg-user" : "bg-gray"
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
					<div className={`w-6 h-6 mb-2 rounded-full ${isOrdering ? "bg-user" : "bg-gray"}`}></div>
					<p className="text-sm font-semibold">주문 대기</p>
				</div>
			</div>

			{isOrdering ? (
				<>
					<UserOrder callTime={callTime} />
				</>
			) : (
				<>
					<img
						className="w-32 h-32 mt-8"
						src={Cooking}
						alt="주문 대기 중입니다"
					/>

					<button
						className="px-6 py-2 m-8 text-lg font-bold text-white bg-gradient-to-r from-main to-user rounded-xl"
						onClick={openCancelModal}
					>
						줄서기 취소
					</button>

					{/* 모달 */}
					<Modal
						isOpen={isModalOpen}
						close={closeModal}
						style={waitingCancelingModalStyle}
					>
						{/* 모달에 children으로 전달할 내용 */}
						<div className="flex flex-col items-center">
							<Ticket
								size={96}
								className="m-10 text-user"
							/>
							<p className="my-4 text-2xl font-bold text-center">
								줄서기를 <br /> 취소하시겠습니까?
							</p>
							<button
								className="px-6 py-3 my-5 font-bold text-white rounded text-md bg-gradient-to-r from-main to-user"
								onClick={confirmCancellation} // 취소 확인 버튼
							>
								네, 취소하겠습니다
							</button>
						</div>
					</Modal>
				</>
			)}
		</div>
	);
};

export default UserWaitingInfo;
