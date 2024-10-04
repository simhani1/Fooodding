import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerGenderGraph = () => {
	// 그래프 Lables
	const labels = ["0 - 9세", "10 - 19세", "20 - 29세", "30 - 39세", "40 - 49세", "50 - 59세", "60 - 69세", "70 -"];

	// 그래프 DataSet
	const data = {
		labels,
		datasets: [
			{
				label: "여성",
				data: [2, 12, 24, 30, 10, 5, 2, 0],
				backgroundColor: "rgba(238, 73, 76, 0.7)",
				borderWidth: 2,
				borderRadius: 4,
				borderColor: "rgb(238, 73, 76)",
			},
			{
				label: "남성",
				data: [3, 9, 22, 21, 10, 2, 3, 0],
				backgroundColor: "rgba(103, 199, 255, 0.7)",
				borderWidth: 2,
				borderRadius: 4,
				borderColor: "rgb(103, 199, 255)",
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
				text: "성별 / 연령대별 평균 손님 수",
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

export default OwnerGenderGraph;
