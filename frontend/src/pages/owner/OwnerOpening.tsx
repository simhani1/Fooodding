import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { ITodayMenu } from "@interface/owner";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import TodayMenu from "@components/owner/TodayMenu";
import Modal from "@components/common/Modal";
import { waitingCancelingModalStyle } from "@utils/modalStyle";

import { FireTruck } from "@phosphor-icons/react";

const OwnerOpening = () => {
	const nav = useNavigate();

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
	const [todayMenuList, setTodayMenuList] = useState<ITodayMenu[]>([
		{
			id: 0,
			image: null,
			name: "",
			price: 0,
			isSelected: true,
			//선택해제된 애들만 배열로 넘겨주세용
		},
	]);

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
			setTodayMenuList((prevList) => prevList.map((menu) => ({ ...menu, isSelected: false })));
		} else {
			// 토글이 true가 되면 모든 메뉴의 isSelected를 true로 변경
			setTodayMenuList((prevList) => prevList.map((menu) => ({ ...menu, isSelected: true })));
		}
	};

	const [disselected, setDisselected] = useState<ITodayMenu[]>([
		{
			id: 0,
			image: null,
			name: "",
			price: 0,
			isSelected: true,
			//선택해제된 애들만 배열로 넘겨주세용
		},
	]);

	// 메뉴 선택 상태 변경 함수
	const handleSelectMenu = (id: number) => {
		setTodayMenuList((prevList) =>
			prevList.map((menu) => (menu.id === id ? { ...menu, isSelected: !menu.isSelected } : menu)),
		);
	};

	//개별선택 감지 후 토글변경
	useEffect(() => {
		const allSelected = todayMenuList.every((menu) => menu.isSelected);
		setIsToggled(allSelected);

		// 선택되지 않은 메뉴 필터링
		const notSelectedMenus = todayMenuList.filter((menu) => !menu.isSelected);
		setDisselected(notSelectedMenus);
	}, [todayMenuList]);

	useEffect(() => {
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
						console.error("Error occurred while fetching location:", error);
					},
				);
			} else {
				console.error("Geolocation is not supported by this browser.");
			}
		};

		setMyLocation();

		//////메뉴 가져오기
		setTodayMenuList(exampleMenuList);
	}, []);

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
	const beforeStartToday = () => {
		// 유효성 검사
		if (!currentPosition || disselected.length === todayMenuList.length) {
			setErrorModal(true);
			return;
		}

		setStartModal(true);

		//axios
	};

	return (
		<Container>
			<Main>
				<>
					<h1 className="text-3xl font-extrabold">멋지다 붕어빵 가게 사장님</h1>
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
								onCenterChanged={handleCenterChanged} // 지도의 중앙이 변경될 때 호출
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

						<div className="flex flex-wrap justify-between gap-4 mb-12">
							{todayMenuList.map((todayMenu) => (
								<TodayMenu
									key={todayMenu.id}
									todayMenu={todayMenu}
									onSelect={() => handleSelectMenu(todayMenu.id)}
								/>
							))}
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
									onClick={() => nav("/owner/close")}
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

const exampleMenuList: ITodayMenu[] = [
	{
		id: 8,
		name: "팥 붕어빵",
		price: 2000,
		image: "https://img.bizthenaum.co.kr/img2022/bean_bread_01.jpg",
		isSelected: true,
	},
	{
		id: 1,
		name: "슈크림 붕어빵",
		price: 3000,
		image: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3295018730/B.jpg?422000000",
		isSelected: true,
	},
	{
		id: 2,
		name: "파인애플 붕어빵",
		price: 4000,
		image: null,
		isSelected: true,
	},
	{
		id: 3,
		name: "김치치즈 붕어빵",
		price: 4000,
		image: "https://ssproxy.ucloudbiz.olleh.com/v1/AUTH_e59809eb-bdc9-44d7-9d8f-2e7f0e47ba91/post_card/73254_1606288078_kzDftX5a.png",
		isSelected: true,
	},
	{
		id: 4,
		name: "민트초코 붕어빵",
		price: 4000,
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMtr_ewivkWhWmpGr7RS-noq0NO-oAfdPKQ&s",
		isSelected: true,
	},
	{
		id: 5,
		name: "초코초코 붕어빵",
		price: 4000,
		image: null,
		isSelected: true,
	},
	{
		id: 6,
		name: "피자 붕어빵",
		price: 4000,
		image: null,
		isSelected: true,
	},
	{
		id: 7,
		name: "고구마 붕어빵",
		price: 4000,
		image: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/gift/pdt/1583/S1616570666704.jpg",
		isSelected: true,
	},
];
