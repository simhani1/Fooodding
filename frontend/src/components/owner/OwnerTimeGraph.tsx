import { useEffect, useState } from "react";

import { IOwnerGraph } from "@interface/owner";

import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getWaitingByTime } from "@api/data-api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerTimeGraph = ({ weekday }: IOwnerGraph) => {
	const [timeData, setTimeData] = useState(Array(24).fill(0));

	useEffect(() => {
		const fetchTimeGraph = async () => {
			const response = await getWaitingByTime();
			const filteredData = response.data.data.filter((item: any) => item.dayOfWeek === weekday);

			const newTimeData = Array(24).fill(0);
			filteredData.forEach(({ time, count }: { time: string; count: number }) => {
				const hour = parseInt(time);
				if (!isNaN(hour)) {
					newTimeData[hour] += count;
				}
			});

			setTimeData(newTimeData);
		};

		fetchTimeGraph();
	}, [weekday]);

	// 그래프 Lables
	const labels = [
		"0시",
		"1시",
		"2시",
		"3시",
		"4시",
		"5시",
		"6시",
		"7시",
		"8시",
		"9시",
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
	const data = {
		labels,
		datasets: [
			{
				label: `${weekday} 기준: 시간대별 평균 손님 수`,
				data: timeData,
				backgroundColor: "#F27387",
				borderRadius: 5,
				borderColor: "#F27387",
				barThickness: 24,
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
		/>
	);
};

export default OwnerTimeGraph;
