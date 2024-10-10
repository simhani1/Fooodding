import { IMapDetail } from "@interface/map";
import BarGraph from "@components/owner/BarGraph";
import DoughnutGraph from "@components/owner/DoughnutGraph";

import { X } from "@phosphor-icons/react";

const MapDetail = ({ dongName, setShowDetail }: IMapDetail) => {
	// 버튼 클릭 시 동 상세 모달이 닫히는 함수
	const handleDetailButtonClick = () => {
		setShowDetail(false);
	};

	// 그래프 Lables
	const labels = [
		"00시",
		"01시",
		"02시",
		"03시",
		"04시",
		"05시",
		"06시",
		"07시",
		"08시",
		"09시",
		"10시",
		"11시",
		"12시",
		"13시",
		"14시",
		"15시",
		"16시",
		"17시",
		"18시",
		"19시",
		"20시",
		"21시",
		"22시",
		"23시",
	];

	// 그래프 DataSet
	const firstData = {
		labels,
		datasets: [
			{
				label: "전체 유동 인구",
				data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 100, 120, 20, 21, 22, 23, 24],
				backgroundColor: "rgba(242, 115, 135, 0.7)",
				borderWidth: 2,
				borderRadius: 2,
				borderColor: "rgb(242, 115, 135)",
			},
		],
	};

	const secondData = {
		labels,
		datasets: [
			{
				label: "타겟 유동 인구",
				data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 100, 120, 20, 21, 22, 23, 24],
				backgroundColor: "rgba(207, 105, 163, 0.7)",
				borderWidth: 2,
				borderRadius: 2,
				borderColor: "rgb(207, 105, 163)",
			},
		],
	};

	return (
		<div
			id="map-detail"
			className="absolute overflow-y-auto border border-solid shadow-sm border-gray z-10 bg-white rounded-lg w-7/12 p-12 h-[calc(100%-4rem)] right-8 top-8"
		>
			<div className="mb-8 map-detail-title">
				<div className="flex items-start justify-between">
					<h1 className="mb-4 text-4xl font-extrabold">{dongName}</h1>
					<X
						size={48}
						weight="bold"
						onClick={handleDetailButtonClick}
					/>
				</div>
				<p className="text-2xl">오늘의 상권 정보 확인하기</p>
			</div>
			<div className="detail-predicted-population">
				<h2 className="text-2xl font-bold">오늘의 예상 유동 인구</h2>
				<BarGraph
					data={firstData}
					labels={labels}
				/>
				<h2 className="text-2xl font-bold">오늘의 예상 타겟 유동 인구</h2>
				<BarGraph
					data={secondData}
					labels={labels}
				/>
			</div>
			<div className="detail-category-population">
				<h2 className="text-2xl font-bold">카테고리별 예약 인구 비율 TOP5</h2>
				<div className="flex gap-8 text-2xl">
					<DoughnutGraph />
					<div className="mt-10 ranking">
						<div className="flex gap-4 mb-4">
							<span className="w-10 font-bold">1위</span>
							<div className="flex justify-between w-52">
								<span>한식</span>
								<span>44%</span>
							</div>
						</div>
						<div className="flex gap-4 mb-4">
							<span className="w-10 font-bold">2위</span>
							<div className="flex justify-between w-52">
								<span>카페/디저트</span>
								<span>26%</span>
							</div>
						</div>
						<div className="flex gap-4 mb-4">
							<span className="w-10 font-bold">3위</span>
							<div className="flex justify-between w-52">
								<span>분식</span>
								<span>13%</span>
							</div>
						</div>
						<div className="flex gap-4 mb-4">
							<span className="w-10 font-bold">4위</span>
							<div className="flex justify-between w-52">
								<span>양식</span>
								<span>11%</span>
							</div>
						</div>
						<div className="flex gap-4 mb-4">
							<span className="w-10 font-bold">5위</span>
							<div className="flex justify-between w-52">
								<span>일식</span>
								<span>5%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MapDetail;
