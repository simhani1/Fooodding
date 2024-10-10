import { useEffect, useState } from "react";
import { IOrderingProps } from "@interface/waiting";
import { HourglassLow } from "@phosphor-icons/react";
// import { useNavigate } from "react-router-dom";

const UserOrder = ({ callTime }: IOrderingProps) => {
	// const nav = useNavigate();
	console.log(callTime);

	const [remainingTime, setRemainingTime] = useState(600); // 10분 = 600초
	const [isTimeExceeded, setIsTimeExceeded] = useState(false); // 10분 초과 여부
	const [timeDifference, setTimeDifference] = useState(0); // 서버와 클라이언트 시간 차이

	console.log(timeDifference);

	useEffect(() => {
		// 서버 시간과 클라이언트 시간의 차이를 계산
		const currentTime = Date.now(); // 현재 시간 (밀리초)
		const serverTime = callTime * 1000; // 서버에서 받은 시간이 초 단위로 왔을 경우, 밀리초로 변환
		const diff = currentTime - serverTime; // 클라이언트와 서버 시간 차이 (ms)
		setTimeDifference(diff);

		// 경과 시간을 계산하는 함수
		const calculateRemainingTime = () => {
			const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
			const startTimeInSeconds = Math.floor(callTime / 1000); // 서버에서 받은 시간 (초 단위)
			const elapsed = currentTime - startTimeInSeconds; // 경과 시간 계산
			const timeLeft = 600 - elapsed; // 10분에서 경과 시간을 빼서 남은 시간 계산
			return timeLeft > 0 ? timeLeft : 0; // 남은 시간이 0보다 작아지지 않도록 처리
		};

		// 처음 로드할 때 남은 시간 계산
		setRemainingTime(calculateRemainingTime());

		// 1초마다 타이머 업데이트
		const timer = setInterval(() => {
			const timeLeft = calculateRemainingTime();
			setRemainingTime(timeLeft);
			if (timeLeft === 0) {
				setIsTimeExceeded(true); // 10분 초과 시 상태 업데이트
			}
		}, 1000);

		return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
	}, [callTime]);

	// 분과 초를 포맷팅
	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;

	// 시간이 초과되면 경고 및 페이지 이동
	if (isTimeExceeded) {
		alert("10분 초과되었습니다!");
		// nav("/users");
		return null;
	}

	return (
		<>
			<div className="flex flex-row m-4">
				<p className="text-2xl font-extrabold text-user">10분 이내</p>
				<p className="text-2xl font-extrabold text-black">에 와주세요!</p>
			</div>

			<p className="mb-4 font-medium text-black text-md">오지 않으면 자동 취소됩니다.</p>

			<div className="flex items-center gap-4 p-4 border-2 border-solid rounded-lg border-gray">
				<HourglassLow size={24} />
				<h3 className="text-xl font-bold">
					남은 시간:
					<span className="ml-4 text-user">
						{minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초{" "}
					</span>
				</h3>
			</div>
		</>
	);
};

export default UserOrder;
