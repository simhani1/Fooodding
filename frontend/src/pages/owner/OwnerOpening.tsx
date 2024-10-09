import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { ITodayMenu } from "@interface/owner";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import TodayMenu from "@components/owner/TodayMenu";
import Modal from "@components/common/Modal";

import { useLoading } from "@utils/LoadingContext";
import { waitingCancelingModalStyle } from "@utils/modalStyle";
import { getMenuList, openMarket } from "@api/food-truck-api";

import { FireTruck } from "@phosphor-icons/react";
// import { isCustomAxiosError } from "@api/error";

const OwnerOpening = () => {
	const nav = useNavigate();
	const { isLoading, setLoading } = useLoading(); // 전역 로딩 상태를 변경하기 위한 함수

	const today = new Date();
	const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

	///지도
	const mapRef = useRef<kakao.maps.Map | null>(null);

	const [currentPosition, setCurrentPosition] = useState({
		lat: 37.566826,
		lng: 126.9786567,
	});

	const [mapCenter, setMapCenter] = useState({
		lat: 37.566826,
		lng: 126.9786567,
	});

	//메뉴
	const [todayMenuList, setTodayMenuList] = useState<ITodayMenu[]>([]);
	const [foodTruckId, setFoodTruckId] = useState<number>(0);
	const [ownerNickName, setOwnerNickName] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);

	//모달
	const [errorModal, setErrorModal] = useState(false); //유효성검사
	const [startModal, setStartModal] = useState(false); //장사 시작 체크

	//토글
	const [isToggled, setIsToggled] = useState(true);

	// 토글 상태를 변경하는 함수
	const handleToggle = () => {
		const newToggleState = !isToggled;
		setIsToggled(!isToggled);

		// 토글이 false가 되면 모든 메뉴의 isSelected를 false로 변경
		if (!newToggleState) {
			setTodayMenuList((prevList) => prevList.map((menu) => ({ ...menu, onSale: false })));
		} else {
			// 토글이 true가 되면 모든 메뉴의 isSelected를 true로 변경
			setTodayMenuList((prevList) => prevList.map((menu) => ({ ...menu, onSale: true })));
		}
	};

	// 메뉴 선택 상태 변경 함수
	const handleSelectMenu = (id: number) => {
		setTodayMenuList((prevList) =>
			prevList.map((menu) => (menu.menuId === id ? { ...menu, onSale: !menu.onSale } : menu)),
		);
	};

	const [disselected, setDisselected] = useState<number[]>([]);

	//개별선택 감지 후 토글변경
	useEffect(() => {
		const allSelected = todayMenuList.every((menu) => menu.onSale);
		setIsToggled(allSelected);

		// 선택되지 않은 메뉴의 menuId만 추출하여 배열 생성
		const notSelectedMenuIds = todayMenuList.filter((menu) => !menu.onSale).map((menu) => menu.menuId);

		setDisselected(notSelectedMenuIds);
	}, [todayMenuList]);

	useEffect(() => {
		// 로딩 상태 시작
		setLoading(true);

		// 사용자 현재 위치 가져오기
		const setMyLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const newPosition = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};

						setCurrentPosition(newPosition);
						setMapCenter(newPosition);

						// Kakao Maps의 panTo 메서드를 사용하여 지도를 이동
						if (mapRef.current) {
							mapRef.current.panTo(new kakao.maps.LatLng(newPosition.lat, newPosition.lng));
						}
					},
					(error) => {
						console.error("위치를 찾을 수 없습니다.", error);
					},
				);
			} else {
				console.error("여기에서 위치 기능을 사용할 수 없습니다.");
			}
		};

		// 메뉴 리스트 가져오기
		const fetchMenuList = async () => {
			try {
				const response = await getMenuList();
				const data = response.data.data;

				setTodayMenuList(data.menuList);
				setFoodTruckId(data.foodTruckId);
				setOwnerNickName(data.name);
				setIsOpen(data.isOpened);
			} catch (err) {
				console.error(err);
			} finally {
				// 최소 0.5초 대기 후 로딩 상태 해제
				setTimeout(() => {
					setLoading(false);
				}, 500);
			}
		};

		setMyLocation();
		fetchMenuList();
	}, [nav, setLoading]);

	useEffect(() => {
		// 상태가 변경된 후에 특정 동작을 처리할 수 있습니다.
		if (isOpen) {
			if (foodTruckId && ownerNickName) {
				// 상태가 준비된 후에만 이동
				setTimeout(() => {
					nav("/owners/close", { state: { foodTruckId: foodTruckId, ownerNickName: ownerNickName } });
				}, 500);
			}
		}
	}, [isOpen]); // 상태가 변경될 때 실행됩니다.

	// 로딩 중일 때는 화면을 렌더링하지 않음
	if (isLoading) {
		return null;
	}

	// 지도의 중앙이 변경될 때 호출되는 함수
	const handleCenterChanged = (map: kakao.maps.Map) => {
		const center = map.getCenter();

		setCurrentPosition({
			lat: center.getLat(),
			lng: center.getLng(),
		});
	};

	//모달
	const closeModal = () => {
		setErrorModal(false);
		setStartModal(false);
	};

	//장사 시작하기
	const beforeStartToday = async () => {
		// 유효성 검사
		if (!currentPosition || disselected.length === todayMenuList.length) {
			setErrorModal(true);
			return;
		}

		setStartModal(true);
	};

	const openTruck = async () => {
		const request = {
			latitude: currentPosition.lat,
			longitude: currentPosition.lng,
			menuList: disselected,
		};

		console.log(request);

		try {
			await openMarket(foodTruckId, request);
			nav("/owners/close");
		} catch (err) {
			console.error("장사 시작 중 오류가 발생했습니다!", err);
		}
	};

	return (
		<Container>
			<Main>
				<>
					<h1 className="text-3xl font-extrabold">{ownerNickName} 사장님</h1>
					<div>
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-6">
								<p className="text-xl font-bold">{formattedDate}</p>
								<p className="text-sm text-gray">지도를 움직여 내 위치를 설정해주세요</p>
							</div>
							<button
								className="px-8 py-2 text-lg font-bold text-white rounded-md bg-gradient-to-r from-main to-boss"
								onClick={beforeStartToday}
							>
								오늘 장사 시작하기
							</button>
						</div>

						<div className="w-full h-48 overflow-hidden rounded-lg shadow-lg">
							<Map
								center={mapCenter}
								className="w-full h-full"
								level={2}
								ref={mapRef}
								onCenterChanged={handleCenterChanged}
							>
								<MapMarker
									position={currentPosition}
									image={{
										src: "/MapPin.png",
										size: {
											width: 48,
											height: 48,
										},
									}}
								></MapMarker>
							</Map>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-6">
								<p className="text-2xl font-bold">오늘의 메뉴</p>
								<p className="text-sm text-gray">
									오늘 판매할 메뉴를 클릭한 후 '시작하기'를 눌러주세요.
								</p>
							</div>

							<div className="flex items-center gap-3">
								<div
									onClick={handleToggle}
									className={`w-12 h-6 flex items-center bg-${
										isToggled ? "boss" : "gray"
									} rounded-full p-1 cursor-pointer transition-colors duration-300`}
								>
									<div
										className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
											isToggled ? "translate-x-6" : "translate-x-0"
										}`}
									></div>
								</div>
								<p className="font-bold">모두 선택</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-10 mb-12">
							{todayMenuList.length === 0 ? (
								<div className="flex flex-col items-center justify-center w-full">
									<p className="my-20 text-2xl font-bold text-center"> 메뉴를 먼저 등록해주세요. </p>
									<button
										className="px-6 py-3 my-5 text-xl font-bold text-white rounded bg-gradient-to-r from-main to-boss"
										onClick={() => nav("/owners/foodtruck/menu")} //나중에 메뉴란으로 연결
									>
										메뉴 등록하기
									</button>
								</div>
							) : (
								todayMenuList.map((todayMenu) => (
									<TodayMenu
										key={todayMenu.menuId}
										todayMenu={todayMenu}
										onSelect={() => handleSelectMenu(todayMenu.menuId)}
									/>
								))
							)}
						</div>
					</div>

					{/* 모달 표시 */}
					{errorModal && (
						<Modal
							isOpen={errorModal}
							close={closeModal}
							style={waitingCancelingModalStyle}
						>
							{/* 모달에 children으로 전달할 내용 */}
							<div className="flex flex-col items-center">
								<FireTruck
									size={96}
									className="m-10 text-user"
								/>
								<p className="my-4 text-2xl font-bold text-center">
									판매할 메뉴 없이 <br /> 시작할 수 없습니다.
								</p>
								<button
									className="px-6 py-3 my-5 font-bold text-white rounded text-md bg-gradient-to-r from-main to-user"
									onClick={closeModal}
								>
									메뉴 선택하기
								</button>
							</div>
						</Modal>
					)}

					{/* 모달 표시 */}
					{startModal && (
						<Modal
							isOpen={startModal}
							close={closeModal}
							style={waitingCancelingModalStyle}
						>
							{/* 모달에 children으로 전달할 내용 */}
							<div className="flex flex-col items-center">
								<FireTruck
									size={96}
									className="m-10 text-user"
								/>
								<p className="my-4 text-2xl font-bold text-center">장사를 시작하시겠습니까?</p>
								<button
									className="px-6 py-3 my-5 font-bold text-white rounded text-md bg-gradient-to-r from-main to-user"
									onClick={openTruck}
								>
									시작하겠습니다
								</button>
							</div>
						</Modal>
					)}
				</>
			</Main>
		</Container>
	);
};

export default OwnerOpening;
