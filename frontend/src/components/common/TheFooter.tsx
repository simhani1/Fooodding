import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userLogout, userWithdraw } from "@api/auth-api";
import { logOutModalStyle } from "@utils/modalStyle";
import Modal from "./Modal";

import navbarBackground from "@assets/navbar_background.png";
import navbarHome from "@assets/navbar_home.png";
import navbarLogout from "@assets/navbar_logout.png";
import navbarReservation from "@assets/navbar_reservation.png";

const TheFooter = () => {
	const nav = useNavigate();

	const [showNavbar, setShowNavbar] = useState(true); // 네비게이션 바 표시 상태
	const [lastScrollTop, setLastScrollTop] = useState(0); // 마지막 스크롤 위치

	const [logOutModal, setLogOutModal] = useState(false);

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

	//로그아웃 또는 탈퇴
	const openModal = () => {
		setLogOutModal(true);
	};

	//모달
	const closeModal = () => {
		setLogOutModal(false);
	};

	//로그아웃
	const handleLogOut = async () => {
		try {
			await userLogout();
			nav("/");
		} catch (err) {
			console.error(err);
		}
	};

	//탈퇴
	const handleWithDraw = async () => {
		try {
			await userWithdraw();
			nav("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
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
							src={navbarLogout}
							alt="로그아웃 및 탈퇴하기"
							className="mt-24 mb-1 w-11 h-11"
							onClick={openModal}
						/>
					</div>
				</div>
			</div>

			{logOutModal && (
				<Modal
					isOpen={logOutModal}
					close={closeModal}
					style={logOutModalStyle}
				>
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-center pb-4 mb-4">
							<p className="my-4 text-2xl font-bold text-center">
								로그아웃
								<br />
								하시겠습니까?
							</p>
							<button
								className="px-6 py-3 my-5 font-bold text-white rounded text-md bg-gradient-to-r from-main to-user"
								onClick={handleLogOut}
							>
								로그아웃
							</button>
						</div>
						<p
							className="underline text-md text-gray"
							onClick={handleWithDraw}
						>
							탈퇴하겠습니다.
						</p>
					</div>
				</Modal>
			)}
		</>
	);
};

export default TheFooter;
