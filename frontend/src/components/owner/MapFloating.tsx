import { useState } from "react";

import { Circle } from "@phosphor-icons/react";

const MapFloating = () => {
	const [active, setActive] = useState("recommend");

	// 구역별 컴포넌트 변경 연산
	const clickRecommend = active === "recommend" ? "bg-boss text-white" : "bg-white text-gray";
	const clickPermission = active === "permission" ? "bg-boss text-white" : "bg-white text-gray";
	const clickCongestion = active === "congestion" ? "bg-boss text-white" : "bg-white text-gray";

	return (
		<div
			id="section-floating"
			className="absolute z-10 rounded-lg shadow-sm right-8 top-8"
		>
			<div className="flex justify-center">
				<div
					className={`recommend w-24 py-2 rounded-l-lg flex justify-center text-xl font-semibold border border-solid border-gray ${clickRecommend}`}
					onClick={() => setActive("recommend")}
				>
					추천구역
				</div>
				<div
					className={`permission w-24 py-2 flex justify-center text-xl font-semibold border border-solid border-gray ${clickPermission}`}
					onClick={() => setActive("permission")}
				>
					허가구역
				</div>
				<div
					className={`congestion w-24 py-2 rounded-r-lg flex justify-center text-xl font-semibold border border-solid border-gray ${clickCongestion}`}
					onClick={() => setActive("congestion")}
				>
					혼잡도
				</div>
			</div>

			{/* active === congestion일 때 토글 */}
			{active === "congestion" && (
				<div className="flex flex-wrap p-4 text-xl font-semibold bg-white rounded-lg gap-x-20 gap-y-2 w-72">
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
