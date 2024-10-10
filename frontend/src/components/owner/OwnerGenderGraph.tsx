import { getWaitingByGenderAge } from "@api/data-api";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerGenderGraph = () => {
	const [femaleData, setFemaleData] = useState<number[]>(Array(7).fill(0));
	const [maleData, setMaleData] = useState<number[]>(Array(7).fill(0));

	useState(() => {
		const fetchGenderGraph = async () => {
			const response = await getWaitingByGenderAge();
			const femaleArray = Array(7).fill(0);
			const maleArray = Array(7).fill(0);

			response.data.data.forEach(({ gender, ages, count }: { gender: string; ages: string; count: number }) => {
				const index = labels.indexOf(ages);
				if (gender === "F") femaleArray[index] += count;
				else if (gender === "M") maleArray[index] += count;
			});

			setFemaleData(femaleArray);
			setMaleData(maleArray);
		};

		fetchGenderGraph();
	});

	// 그래프 Lables
	const labels = ["10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79"];

	// 그래프 DataSet
	const data = {
		labels,
		datasets: [
			{
				label: "여성",
				data: femaleData,
				backgroundColor: "rgba(238, 73, 76, 0.7)",
				borderWidth: 2,
				borderRadius: 4,
				borderColor: "rgb(238, 73, 76)",
			},
			{
				label: "남성",
				data: maleData,
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
		scales: {
			x: {
				display: true,
				grid: {
					lineWidth: 0,
				},
				ticks: {
					color: "black",
				},
			},
		},
		plugins: {
			legend: {
				display: false,
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
		/>
	);
};

export default OwnerGenderGraph;
