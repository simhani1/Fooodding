import { useState } from "react";

import logo from "@assets/fooodding_boss_logo.svg";
import { HouseLine, MapTrifold, FireTruck, UserCircle } from "@phosphor-icons/react";

const TheSideBar = () => {
	const [active, setActive] = useState("home");

	// 텍스트 & 아이콘 색상 변경 연산
	const colorToHome = active === "home" ? "text-main" : "text-white";
	const colorToMap = active === "map" ? "text-main" : "text-white";
	const colorToBusiness = active === "business" ? "text-boss" : "text-white";
	const colorToMypage = active === "mypage" ? "text-boss" : "text-white";

	return (
		<div
			id="header"
			className="fixed bg-gradient-to-b from-main to-boss h-screen w-48 pb-12 inline-block"
		>
			<div className="h-full flex flex-col items-center justify-between">
				<div className="logo w-24 h-24 my-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
					<img
						src={logo}
						alt="fooodding"
						className="w-20 h-20"
					/>
				</div>
				<div
					className={`home flex flex-col items-center justify-center w-full py-6 ${
						active === "home" ? "bg-white rounded-l-3xl" : ""
					}`}
					onClick={() => setActive("home")}
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
					onClick={() => setActive("map")}
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
					onClick={() => setActive("business")}
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
					onClick={() => setActive("mypage")}
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
