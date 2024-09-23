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
			className="p-4 rounded-lg shadow-sm w-80"
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
				<div className="flex flex-wrap pt-4 text-xl font-semibold gap-x-20 gap-y-2">
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="mr-2 text-red"
						/>
						<span>붐빔</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="mr-2 text-yellow"
						/>
						<span>약간 붐빔</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="mr-2 text-green"
						/>
						<span>보통</span>
					</div>
					<div className="flex items-center">
						<Circle
							size={24}
							weight="fill"
							className="mr-2 text-blue"
						/>
						<span>여유</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default MapFloating;
