import { Circle } from "@phosphor-icons/react";
import { useState } from "react";

const MapFloating = () => {
	const [active, setActive] = useState("recommend");

	// 구역별 컴포넌트 변경 연산
	const clickRecommend = active === "recommend" ? "bg-boss text-white" : "";
	const clickPermission = active === "permission" ? "bg-boss text-white" : "";
	const clickCongestion = active === "congestion" ? "bg-boss text-white" : "";

	return (
		<div
			id="section-floating"
			className="w-80 p-4 absolute right-8 top-8 rounded-lg shadow-sm"
		>
			<div className="flex justify-center">
				<div
					className={`recommend w-24 py-2 rounded-l-lg flex justify-center text-xl font-semibold text-gray border border-solid border-gray ${clickRecommend}`}
					onClick={() => setActive("recommend")}
				>
					추천구역
				</div>
				<div
					className={`permission w-24 py-2 flex justify-center text-xl font-semibold text-gray border border-solid border-gray ${clickPermission}`}
					onClick={() => setActive("permission")}
				>
					허가구역
				</div>
				<div
					className={`congestion w-24 py-2 rounded-r-lg flex justify-center text-xl font-semibold text-gray border border-solid border-gray ${clickCongestion}`}
					onClick={() => setActive("congestion")}
				>
					혼잡도
				</div>
			</div>

			{/* active === congestion일 때 토글 */}
			{active === "congestion" && (
				<div className="flex flex-wrap pt-4 gap-x-20 gap-y-2 text-xl font-semibold">
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="text-red mr-2"
						/>
						<span>붐빔</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="text-yellow mr-2"
						/>
						<span>약간 붐빔</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="text-green mr-2"
						/>
						<span>보통</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="text-blue mr-2"
						/>
						<span>여유</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default MapFloating;
