import { IWaitingOwnerProps } from "@interface/waiting";
import { useEffect, useState } from "react";

const MILLISECONDS_IN_TEN_MINUTE = 1000 * 60 * 10;

const convertTimeString = (minutes: number, seconds: number) => {
	const minutesString = String(minutes).padStart(2, "0");
	const secondsString = String(seconds).padStart(2, "0");
	return `${minutesString}:${secondsString}`;
};

const OwnerWaitingBlock = ({ waiting, children, isOrder, onCancel }: IWaitingOwnerProps) => {
	const [restMinutes, setRestMinutes] = useState<number>(0);
	const [restSeconds, setRestSeconds] = useState<number>(0);

	// 10분 타이머 설정
	useEffect(() => {
		if (isOrder) {
			const startTime = Date.now();
			const waitingTime = Number(waiting.changedAt); // 서버에서 받은 시간을 그대로 사용
			const timeDifference = waitingTime - startTime; // 서버와 현재 시간의 차이

			console.log("서버 시간과의 차이 (ms):", timeDifference);

			const interval = setInterval(() => {
				const currentTime = Date.now();
				const diffMilliseconds = currentTime - startTime + timeDifference; // 서버 시간 차이를 더해서 경과 시간 계산
				const restMilliseconds = MILLISECONDS_IN_TEN_MINUTE - diffMilliseconds;

				console.log(restMilliseconds);

				if (restMilliseconds > 0 && restMilliseconds <= MILLISECONDS_IN_TEN_MINUTE) {
					setRestMinutes(Math.floor(restMilliseconds / 60000));
					setRestSeconds(Math.floor((restMilliseconds % 60000) / 1000));
				} else {
					// 10분이 지나면 타이머 종료 및 예약 취소
					// onCancel(waiting.waitingId);
					clearInterval(interval);
				}
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isOrder, waiting.changedAt, waiting.waitingId, onCancel]);

	return (
		<div className="flex items-center justify-between px-6 py-4 mx-2 my-8 rounded-lg shadow-sm">
			<h2 className="text-xl font-extrabold text-boss">{waiting.number}번</h2>

			<div className="flex flex-col gap-1 text-center">
				<p className="text-xl font-bold">{waiting.userName} 님</p>
				<span className="text-gray">
					{isOrder && restMinutes !== 0 && restSeconds !== 0 && convertTimeString(restMinutes, restSeconds)}
				</span>
			</div>

			<div>{children}</div>
		</div>
	);
};

export default OwnerWaitingBlock;
