import { Chart as ChartJS, ArcElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const DoughnutGraph = () => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: "bottom" as const,
				labels: {
					font: {
						size: 16,
					},
				},
			},
			title: {
				display: false,
				text: "카테고리별 예약 인구 비율",
			},
		},
		cutout: "40%",
	};

	const labels = ["1위", "2위", "3위", "4위", "5위"];

	const data = {
		labels,
		datasets: [
			{
				label: "카테고리별 예약 인구 비율",
				data: [5, 4, 3, 2, 1],
				backgroundColor: [
					"rgba(238, 73, 76, 0.5)",
					"rgba(245, 206, 12, 0.5)",
					"rgba(86, 232, 123, 0.5)",
					"rgba(103, 199, 255, 0.5)",
					"rgba(174, 103, 255, 0.5)",
				],
				borderWidth: 2,
				borderRadius: 2,
				borderColor: [
					"rgb(238, 73, 76)",
					"rgb(245, 206, 12)",
					"rgb(86, 232, 123)",
					"rgb(103, 199, 255)",
					"rgb(174, 103, 255)",
				],
			},
		],
	};

	return (
		<div className="my-8 w-72">
			<Doughnut
				options={options}
				data={data}
			/>
		</div>
	);
};

export default DoughnutGraph;
