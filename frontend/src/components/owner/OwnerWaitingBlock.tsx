import { IWaitingOwnerProps } from "@interface/waiting";
import { useEffect, useState } from "react";

const MILLISECONDS_IN_TEN_MINUTE = 1000 * 60 * 10;
const MILLISECONDS_IN_EIGHTEEN_HOURS = 18 * 60 * 60 * 1000;

const convertTimeString = (minutes: number, seconds: number) => {
	const minutesString = String(minutes).padStart(2, "0");
	const secondsString = String(seconds).padStart(2, "0");
	return `${minutesString}:${secondsString}`;
};

const OwnerWaitingBlock = ({ waiting, children, isOrder, onCancel }: IWaitingOwnerProps) => {
	const waitingTime = Number(waiting.changedAt) - MILLISECONDS_IN_EIGHTEEN_HOURS;
	const [restMinutes, setRestMinutes] = useState<number>(0);
	const [restSeconds, setRestSeconds] = useState<number>(0);

	// 10분 카운트 하기 위해 1초마다 현재 시간 - 호출한 시간을 계산하고 있습니다. 10분 카운트를 하려면 10분에서 위 값을 빼주어야 합니다. 그런데 서버에서 넘어온 값이 이상하게 18시간 앞서 있어서 빼주고 있습니다.
	useEffect(() => {
		if (isOrder) {
			const interval = setInterval(() => {
				const diffMilliseconds = Date.now() - waitingTime;
				const restMilliseconds = MILLISECONDS_IN_TEN_MINUTE - diffMilliseconds;
				if (restMilliseconds > 0 && restMilliseconds <= MILLISECONDS_IN_TEN_MINUTE) {
					setRestMinutes(Math.floor(restMilliseconds / 60000));
					setRestSeconds(Math.floor((restMilliseconds % 60000) / 1000));
				} else {
					onCancel(waiting.waitingId);
					clearInterval(interval);
				}
			}, 1000);

			return () => clearInterval(interval);
		}
	});

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
