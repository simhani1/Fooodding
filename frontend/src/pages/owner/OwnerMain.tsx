import { useState } from "react";

import Main from "@components/owner/Main";
import Container from "@components/owner/Container";
import OwnerTimeGraph from "@components/owner/OwnerTimeGraph";
import OwnerGenderGraph from "@components/owner/OwnerGenderGraph";
import OwnerWeather from "@components/owner/OwnerWeather";
import getWeekday from "@utils/get-week-day";
import OwnerRecommend from "@components/owner/OwnerRecommend";

const OwnerMain = () => {
	const [weekday, setWeekday] = useState(getWeekday()[0]);
	const days = ["월", "화", "수", "목", "금", "토", "일"];

	return (
		<Container>
			<Main>
				<>
					<div className="flex flex-col gap-14">
						<div className="flex flex-col gap-5">
							<h2 className="text-4xl font-extrabold">나의 푸드트럭 현황</h2>
							<div className="flex flex-col gap-10">
								<div>
									<h3 className="text-2xl font-semibold text-center">요일 / 시간대별 평균 손님 수</h3>
									<div className="flex flex-col gap-5 p-5 shadow-md rounded-2xl">
										<OwnerTimeGraph weekday={weekday} />
										<div className="flex flex-row justify-center gap-4">
											{days.map((day) => (
												<button
													key={day}
													onClick={() => setWeekday(day)}
													className={`gap-5 px-2 py-1 w-14 text-xl rounded-2xl ${
														day === weekday ? "bg-boss text-white" : ""
													}`}
												>
													{day}
												</button>
											))}
										</div>
									</div>
								</div>

								<div>
									<h3 className="text-2xl font-semibold text-center">성별 / 연령별 평균 손님 수</h3>
									<div className="p-5 shadow-md rounded-2xl">
										<OwnerGenderGraph />
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<h2 className="text-4xl font-extrabold ">오늘의 날씨</h2>
							<OwnerWeather />
						</div>

						<div className="flex flex-col gap-5 mb-10">
							<h2 className="text-4xl font-extrabold">오늘의 추천 플레이스</h2>
							<p className="text-xl">
								추천 기준은 내 판매량의 가장 많은 비율을 차지하는 성별과 연령대가 많은 지역의 예상
								유동인구입니다.
							</p>
							<div className="flex justify-between ">
								<OwnerRecommend
									placeName={"역삼1동"}
									target={"30대 여성"}
									count={351391}
								/>
								<OwnerRecommend
									placeName={"성수1가2동"}
									target={"30대 여성"}
									count={300321}
								/>
								<OwnerRecommend
									placeName={"송파1동"}
									target={"30대 여성"}
									count={288594}
								/>
							</div>
						</div>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerMain;
