import { IBarGraph } from "@interface/map";

import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ data, labels }: IBarGraph) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "bottom" as const,
				labels: {
					font: {
						size: 16,
					},
				},
			},
			title: {
				display: false,
				text: "오늘의 예상 유동 인구",
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 14,
					},
					callback: function (_: any, index: number) {
						return index % 2 === 0 ? labels[index] : "";
					},
				},
			},
		},
	};

	return (
		<Bar
			options={options}
			data={data}
			height={120}
			className="mt-3 mb-4"
		/>
	);
};

export default BarGraph;
