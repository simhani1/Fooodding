import { useState } from "react";

import Main from "@components/owner/Main";
import Container from "@components/owner/Container";
import OwnerTimeGraph from "@components/owner/OwnerTimeGraph";
import OwnerGenderGraph from "@components/owner/OwnerGenderGraph";
import OwnerWeather from "@components/owner/OwnerWeather";
import getWeekday from "@utils/get-week-day";
import OwnerRecommend from "@components/owner/OwnerRecommend";

const OwnerMain = () => {
	const [weekday, setWeekday] = useState(getWeekday());
	const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

	return (
		<Container>
			<Main>
				<>
					<div>
						<h2 className="text-4xl font-extrabold">나의 푸드트럭 현황</h2>
						<div className="mt-12 mb-16">
							<h3 className="text-2xl font-semibold text-center">요일 / 연령별 푸드트럭 현황</h3>
							<OwnerTimeGraph weekday={weekday} />
							<div className="flex flex-row justify-center gap-4">
								{days.map((day) => (
									<button
										key={day}
										onClick={() => setWeekday(day)}
										className="gap-2 px-2 py-1 text-sm border border-solid rounded border-gray text-gray"
									>
										{day}
									</button>
								))}
							</div>
						</div>
						<div className="my-12">
							<h3 className="text-2xl font-semibold text-center">성별 / 연령별 푸드트럭 현황</h3>
							<OwnerGenderGraph />
						</div>
					</div>

					<div>
						<h2 className="mb-12 text-4xl font-extrabold">오늘의 날씨</h2>
						<OwnerWeather />
					</div>
					<div className="mb-20">
						<h2 className="mb-3 text-4xl font-extrabold">오늘의 추천 플레이스</h2>
						<p className="text-xl">
							추천 기준은 내 판매량의 가장 많은 비율을 차지하는 성별과 연령대가 많은 지역의 예상
							유동인구입니다.
						</p>
						<div className="flex justify-between my-8">
							<OwnerRecommend />
							<OwnerRecommend />
							<OwnerRecommend />
						</div>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerMain;
