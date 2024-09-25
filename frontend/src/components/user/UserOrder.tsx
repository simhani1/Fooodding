import { useEffect, useState } from "react";

import { IOrderingProps } from "@interface/waiting";

import { HourglassLow } from "@phosphor-icons/react";

const UserOrder = ({ callTime }: IOrderingProps) => {
	const [minutes, setMinutes] = useState(parseInt(callTime.slice(3, 5)));
	const [seconds, setSeconds] = useState(parseInt(callTime.slice(6, 8)));

	useEffect(() => {
		// 1초마다 초를 감소시키는 타이머
		const timer = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds === 0) {
					if (minutes === 0) {
						clearInterval(timer); // 시간이 0이 되면 타이머 정지
						return 0;
					} else {
						setMinutes((prevMinutes) => prevMinutes - 1); // 분 감소
						return 59;
					}
				}

				return prevSeconds - 1;
			});
		}, 1000);

		// 컴포넌트가 언마운트되면 타이머 정리
		return () => clearInterval(timer);
	}, [minutes]);

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
					{minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
				</h3>
			</div>
		</>
	);
};

export default UserOrder;
