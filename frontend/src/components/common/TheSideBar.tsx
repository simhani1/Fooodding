import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "/pwa-64x64.png";
import { HouseLine, MapTrifold, FireTruck, UserCircle } from "@phosphor-icons/react";

const TheSideBar = () => {
	const nav = useNavigate();
	const location = useLocation();
	const [active, setActive] = useState<string | null>("home");

	// URL 경로에 따라 active 상태 결정
	const getActiveState = (path: string) => {
		if (path === "/owners") return "home";
		if (path === "/owners/map") return "map";
		if (path === "/owners/open") return "business";
		if (path === "/owners/mypage") return "mypage";

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
			className="fixed z-10 inline-block w-40 h-screen pb-12 bg-gradient-to-b from-main to-boss"
		>
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex items-center justify-center w-24 h-24 my-8 overflow-hidden bg-white rounded-full logo">
					<img
						src={logo}
						alt="fooodding"
						className="w-20 h-20"
						onClick={() => nav("/owners")}
					/>
				</div>

				<div
					className={`home flex flex-col items-center justify-center w-full py-6 ${
						active === "home" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => {
						setActive("home");
						nav("/owners");
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
						nav("/owners/map");
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
						nav("/owners/open");
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
						nav("/owners/mypage");
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
