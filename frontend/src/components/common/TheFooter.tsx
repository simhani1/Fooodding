import { useEffect, useState } from "react";

import navbarBackground from "@assets/navbar_background.png";
import navbarHome from "@assets/navbar_home.png";
import navbarMyPage from "@assets/navbar_mypage.png";
import navbarReservation from "@assets/navbar_reservation.png";
import { useNavigate } from "react-router-dom";

const TheFooter = () => {
	const nav = useNavigate();

	const [showNavbar, setShowNavbar] = useState(true); // 네비게이션 바 표시 상태
	const [lastScrollTop, setLastScrollTop] = useState(0); // 마지막 스크롤 위치

	const handleScroll = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
		setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
	}, [lastScrollTop]); // 스크롤 위치 변경 시 다시 렌더링

	return (
		<div
			className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 z-20 ${
				showNavbar ? "translate-y-0" : "translate-y-full"
			}`}
		>
			<img
				src={navbarBackground}
				alt="navbar 배경화면"
				className="w-full"
			/>

			<div className="absolute inset-0 flex justify-around px-5">
				<div className="flex items-center justify-center w-12 h-12 rounded-full">
					<img
						src={navbarReservation}
						alt="예약"
						className="mt-24 mb-1 w-11 h-11"
						onClick={() => nav("/users/list")}
					/>
				</div>
				<div className="flex items-center justify-center w-12 h-12 rounded-full">
					<img
						src={navbarHome}
						alt="홈화면"
						className="w-12 h-12 mt-14"
						onClick={() => nav("/users")}
					/>
				</div>
				<div className="flex items-center justify-center w-12 h-12 rounded-full">
					<img
						src={navbarMyPage}
						alt="마이페이지"
						className="mt-24 mb-1 w-11 h-11"
					/>
				</div>
			</div>
		</div>
	);
};

export default TheFooter;
