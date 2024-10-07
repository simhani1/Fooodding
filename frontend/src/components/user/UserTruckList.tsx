import { useState } from "react";

import UserTruck from "./UserTruck";
import { UserTruckListProps } from "@interface/foodTruck";

const UserTruckList: React.FC<UserTruckListProps> = ({ onExpandChange, trucks, selectedTruck }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		const newExpandedState = !expanded;
		setExpanded(newExpandedState);
		onExpandChange(newExpandedState);
	};

	// 트럭이 없을 때 "주변에 푸드트럭이 없습니다" 메시지를 표시
	const renderEmptyState = () => (
		<div className="flex items-center justify-center h-full">
			<p className="pt-12 text-xl font-bold">주변에 푸드트럭이 없습니다.</p>
		</div>
	);

	// 선택된 트럭이 없으면 첫 번째 트럭을 기본값으로 사용
	const defaultTruck = selectedTruck || trucks[0];

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ${
				expanded ? "h-5/6 overflow-y-auto" : "h-80"
			} bg-white z-10 rounded-lg`}
		>
			<div className="flex flex-col items-center justify-between pt-2">
				<button
					className="w-16 h-2 m-4 rounded-full bg-gray"
					onClick={handleExpand}
				></button>

				{trucks.length === 0 ? (
					// 트럭이 없을 때만 메시지를 표시
					renderEmptyState()
				) : expanded ? (
					// 트럭 목록이 확장되었을 때 트럭 목록 표시
					trucks.map((truck, index) => (
						<UserTruck
							key={index}
							truck={truck}
						/>
					))
				) : (
					// 트럭 목록이 확장되지 않았을 때 선택된 트럭 또는 첫 번째 트럭 표시
					<UserTruck truck={defaultTruck} />
				)}
			</div>
		</div>
	);
};

export default UserTruckList;
