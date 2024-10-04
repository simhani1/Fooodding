import { IOwnerGraph } from "@interface/owner";

import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerTimeGraph = ({ weekday }: IOwnerGraph) => {
	const currentHour = new Date().getHours();

	// 그래프 Lables
	const labels = Array.from({ length: 24 }, (_, i) => {
		const hour = (currentHour + i) % 24;
		return `${hour >= 10 ? hour : `0${hour}`}시`;
	});

	// 그래프 DataSet
	const data = {
		labels,
		datasets: [
			{
				label: `${weekday} 기준: 시간대별 평균 손님 수`,
				data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 100, 120, 20, 21, 22, 23, 24],
				backgroundColor: "rgba(207, 105, 163, 0.7)",
				borderWidth: 2,
				borderRadius: 2,
				borderColor: "rgb(207, 105, 163)",
			},
		],
	};

	// 그래프 옵션
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "bottom" as const,
				labels: {
					font: {
						family: "Pretendard",
						weight: 500,
						size: 16,
					},
					padding: 16,
				},
			},
			title: {
				display: false,
				text: "요일 / 시간대별 평균 손님 수",
			},
			tooltip: {
				bodyFont: {
					family: "Pretendard",
				},
			},
		},
	};

	return (
		<Bar
			options={options}
			data={data}
			height={80}
			className="mt-8 mb-4"
		/>
	);
};

export default OwnerTimeGraph;
