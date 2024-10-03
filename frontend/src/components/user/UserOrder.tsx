import { useEffect, useState } from "react";

import { IOrderingProps } from "@interface/waiting";

import { HourglassLow } from "@phosphor-icons/react";

const UserOrder = ({ callTime }: IOrderingProps) => {
	const [remainingTime, setRemainingTime] = useState(600); // 10분 = 600초

	useEffect(() => {
		// 현재 시간과 백엔드에서 받은 시간 차이를 계산하고 600초(10분)에서 뺌
		const calculateRemainingTime = () => {
			const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
			const startTime = Math.floor(callTime / 1000); // 백엔드에서 받은 시간 (밀리초 -> 초 변환)
			const elapsedTime = currentTime - startTime; // 경과 시간 계산
			const timeLeft = 600 - elapsedTime; // 10분에서 경과 시간을 빼서 남은 시간 계산
			return timeLeft > 0 ? timeLeft : 0; // 남은 시간이 0보다 작아지지 않도록 처리
		};

		// 1초마다 카운트다운 업데이트
		const timer = setInterval(() => {
			setRemainingTime(calculateRemainingTime());
		}, 1000);

		// 컴포넌트 언마운트 시 타이머 정리
		return () => clearInterval(timer);
	}, [callTime]);

	// 분과 초를 포맷팅
	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;

	return (
		<>
			<div className="flex flex-row m-4">
				<p className="text-2xl font-extrabold text-user">10분 이내</p>
				<p className="text-2xl font-extrabold text-black">에 와주세요!</p>
			</div>

			<p className="mb-4 font-medium text-black text-md">오지 않으면 자동 취소됩니다.</p>

			<div className="flex">
				<HourglassLow size={24} />
				<h3>
					남은 시간: {minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
				</h3>
			</div>
		</>
	);
};

export default UserOrder;
