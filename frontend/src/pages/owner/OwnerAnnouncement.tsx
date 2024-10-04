import { useEffect, useState } from "react";

import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import Title from "@components/common/Title";
import BackButton from "@components/owner/BackButton";
import AnnouncementButton from "@components/common/AnnouncementButton";
import { IOwnerAnnouncementDTO } from "@interface/api";
import { createAnnounementLog, getAunnouncementInfo } from "@api/owner-api";

const OwnerAnnouncement = () => {
	const [alarm, setAlarm] = useState("whole");
	const [isToggled, setIsToggled] = useState(false);
	const [visibleCount, setVisibleCount] = useState(10);
	const [announcements, setAnnounements] = useState<IOwnerAnnouncementDTO[]>([]);

	// 공고 데이터 가져오기
	const loadAnnounements = async () => {
		try {
			const response = await getAunnouncementInfo();
			const data = response.data.data;
			setAnnounements(data);
		} catch (error) {
			console.error(error);
		}
	};

	// 토글 버튼 클릭 시 그래프 전환
	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	// 버튼 클릭 시 색 전환
	const handleAlarmButton = (type: string) => {
		setAlarm(type);
	};

	// 외부 링크로 이동
	const handleLink = async (announcementId: number, url: string) => {
		try {
			await createAnnounementLog(announcementId);
			loadAnnounements();
			window.open(url, "_blank");
		} catch (error) {
			console.error(error);
		}
	};

	// 무한 스크롤을 위한 세팅 메서드
	const handleScroll = () => {
		const scrollTop = document.getElementById("infinite-scroll")?.scrollTop || 0;
		const scrollHeight = document.getElementById("infinite-scroll")?.scrollHeight || 0;
		const clientHeight = document.getElementById("infinite-scroll")?.clientHeight || 0;

		if (scrollTop + clientHeight >= scrollHeight - 5) {
			setVisibleCount((prevCount) => prevCount + 10);
		}
	};

	// 전체 공고 & 안 읽은 공고 목록 필터 처리 메서드
	const filteredAnnounements = () => {
		if (alarm === "unread") {
			return announcements.filter((announcement) => !announcement.isOpened);
		}

		return announcements;
	};

	useEffect(() => {
		loadAnnounements();
		const scrollContainer = document.getElementById("infinite-scroll");
		scrollContainer?.addEventListener("scroll", handleScroll);
		return () => scrollContainer?.removeEventListener("scroll", handleScroll);
	}, []);

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
					<div
						id="infinite-scroll"
						className="overflow-y-auto h-[calc(100vh-300px)]"
					>
						{filteredAnnounements()
							.slice(0, visibleCount)
							.map((announcement, index) => (
								<AnnouncementButton
									key={index}
									buttonText={announcement.title}
									onClick={() => handleLink(announcement.announcementId, announcement.url)}
									place={announcement.place}
									date={announcement.date}
									time={announcement.time}
									isOpened={announcement.isOpened}
								/>
							))}
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerAnnouncement;
