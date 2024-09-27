import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "@assets/fooodding_boss_logo.svg";
import { HouseLine, MapTrifold, FireTruck, UserCircle } from "@phosphor-icons/react";

const TheSideBar = () => {
	const nav = useNavigate();
	const location = useLocation();
	const [active, setActive] = useState<string | null>("home");

	// URL 경로에 따라 active 상태 결정
	const getActiveState = (path: string) => {
		if (path === "/owner") return "home";
		if (path === "/owner/map") return "map";
		if (path === "/owner/open") return "business";
		if (path === "/owner/mypage") return "mypage";

		return null;
	};

	// 페이지 로드 시 경로에 따라 active 설정
	useEffect(() => {
		setActive(getActiveState(location.pathname));
	}, [location.pathname]); // location.pathname이 변경될 때마다 실행

	// 텍스트 & 아이콘 색상 변경 연산
	const colorToHome = active === "home" ? "text-main" : "text-white";
	const colorToMap = active === "map" ? "text-main" : "text-white";
	const colorToBusiness = active === "business" ? "text-boss" : "text-white";
	const colorToMypage = active === "mypage" ? "text-boss" : "text-white";

	return (
		<div
			id="header"
			className="fixed z-10 inline-block h-screen pb-12 bg-gradient-to-b from-main to-boss w-44"
		>
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex items-center justify-center w-24 h-24 my-12 overflow-hidden bg-white rounded-full logo">
					<img
						src={logo}
						alt="fooodding"
						className="w-20 h-20"
						onClick={() => nav("/owner")}
					/>
				</div>

				<div
					className={`home flex flex-col items-center justify-center w-full py-6 ${
						active === "home" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => {
						setActive("home");
						nav("/owner");
					}}
				>
					<HouseLine
						size={56}
						className={`${colorToHome}`}
					/>
					<p className={`text-2xl text-center mt-1 ${colorToHome}`}>홈</p>
				</div>

				<div
					className={`map flex flex-col items-center justify-center w-full py-6 ${
						active === "map" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => {
						setActive("map");
						nav("/owner/map");
					}}
				>
					<MapTrifold
						size={56}
						className={`${colorToMap}`}
					/>
					<p className={`text-2xl text-center mt-1 ${colorToMap}`}>내 지도</p>
				</div>

				<div
					className={`business flex flex-col items-center justify-center w-full py-6 ${
						active === "business" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => {
						setActive("business");
						nav("/owner/open");
					}}
				>
					<FireTruck
						size={56}
						className={`${colorToBusiness}`}
					/>
					<p className={`text-2xl text-center mt-1 ${colorToBusiness}`}>장사</p>
				</div>

				<div
					className={`mypage flex flex-col items-center justify-center w-full py-6 ${
						active === "mypage" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => {
						setActive("mypage");
						nav("/owner/mypage");
					}}
				>
					<UserCircle
						size={56}
						className={`${colorToMypage}`}
					/>
					<p className={`text-2xl text-center mt-1 ${colorToMypage}`}>내 정보</p>
				</div>
			</div>
		</div>
	);
};

export default TheSideBar;
