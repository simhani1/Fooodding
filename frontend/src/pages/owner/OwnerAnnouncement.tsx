import { useState } from "react";

import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import Title from "@components/common/Title";
import BackButton from "@components/owner/BackButton";
import AnnouncementButton from "@components/common/AnnouncementButton";

const OwnerAnnouncement = () => {
	const [alarm, setAlarm] = useState("whole");
	const [isToggled, setIsToggled] = useState(false);

	// 토글 버튼 클릭 시 그래프 전환
	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	// 버튼 클릭 시 색 전환
	const handleAlarmButton = (type: string) => {
		setAlarm(type);
	};

	// 외부 링크로 이동
	const handleLink = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<Container>
			<Main>
				<>
					<div className="flex items-center gap-4">
						<BackButton />
						<Title title={"공고 알림 목록"} />
					</div>
					<div className="flex items-center justify-between">
						<div className="flex gap-2 text-2xl">
							<button
								className={`${
									alarm === "whole"
										? "bg-boss text-white"
										: "border border-solid border-gray text-gray"
								} px-4 py-2 rounded-md`}
								onClick={() => handleAlarmButton("whole")}
							>
								전체 알림
							</button>
							<button
								className={`${
									alarm === "unread"
										? "bg-boss text-white"
										: "border border-solid border-gray text-gray"
								} px-4 py-2 rounded-md`}
								onClick={() => handleAlarmButton("unread")}
							>
								안 읽은 알림
							</button>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-medium">푸쉬 알림 설정</span>
							<div className="flex items-center gap-3">
								<div
									onClick={handleToggle}
									className={`w-16 h-8 flex items-center bg-${
										isToggled ? "gray" : "boss"
									} rounded-full p-1 cursor-pointer transition-colors duration-300`}
								>
									<div
										className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
											isToggled ? "translate-x-8" : "translate-x-0"
										}`}
									></div>
								</div>
							</div>
						</div>
					</div>
					<div className="overflow-y-auto h-[calc(100vh-300px)]">
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
						<AnnouncementButton
							buttonText="양평생활문화페스타"
							onClick={() =>
								handleLink(
									"https://www.koreafoodtruck.org/blank-6/sa-hangugpudeuteureoghyeobhoe/2024nyeon-11weol2il-yangpyeongsaenghwalmunhwapeseuta",
								)
							}
							place="양평생활문화센터 일원(물안개공원)"
							duration="24.11.2(토) 11:00~18:00"
							lastDate="2일 전"
						/>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerAnnouncement;
