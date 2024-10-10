import { useNavigate } from "react-router-dom";

import { IRecommendProps } from "@interface/owner";

const OwnerRecommend = ({ placeName, target, count }: IRecommendProps) => {
	const nav = useNavigate();

	const formattedCount = count.toLocaleString("ko-KR");

	return (
		<div className="w-[32%] p-6 shadow-md rounded-2xl">
			<div className="flex justify-between mb-10">
				<h1 className="text-2xl font-semibold">{placeName}</h1>
				<button onClick={() => nav("/owners/map", { state: { dong: placeName } })}>더보기</button>
			</div>
			<div className="flex justify-between text-lg">
				<span>{target}</span>
				<span>{formattedCount}명</span>
			</div>
		</div>
	);
};

export default OwnerRecommend;
