import { useEffect, useRef, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { ITruckInfo } from "@interface/foodTruck";
import TheHeader from "@components/common/TheHeader";
import TheFooter from "@components/common/TheFooter";
import UserTruckList from "@components/user/UserTruckList";
import UserCategory from "@components/user/UserCategory";

import { GpsFix } from "@phosphor-icons/react";

const UserMap = () => {
	const mapRef = useRef<kakao.maps.Map | null>(null);
	const [currentPosition, setCurrentPosition] = useState({
		lat: 37.566826,
		lng: 126.9786567,
	});
	const [mapCenter, setMapCenter] = useState({
		lat: 37.566826,
		lng: 126.9786567,
	});

	const [isListExpanded, setIsListExpanded] = useState(false); //리스트 확장됐느냐 안됐느냐

	const [selectedTruck, setSelectedTruck] = useState<ITruckInfo | null>(null);
	const [trucks, setTrucks] = useState<ITruckInfo[]>([]);

	useEffect(() => {
		setMyLocation();

		// 더미데이터 대신 axios 연결
		// const exampleTrucks: ITruckInfo[] = [
		// 	{
		// 		name: "유니네 오꼬노미야끼",
		// 		content: "싸피인들 오꼬노미야끼 한입 고?",
		// 		menu: ["오꼬노미야끼", "야끼소바"],
		// 		lat: 20.567,
		// 		lng: 126.979,
		// 	},
		// 	{
		// 		name: "예훈이네 붕어빵",
		// 		content: "따끈따끈 붕어빵 어서오세요!",
		// 		menu: ["팥붕어빵", "슈크림붕어빵"],
		// 		lat: 27.565,
		// 		lng: 126.978,
		// 	},
		// ];

		// setTrucks(exampleTrucks);
	}, []);

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

	// Marker 클릭 시 해당 트럭 선택
	const handleMarkerClick = (truck: ITruckInfo) => {
		setSelectedTruck(truck);
		setMapCenter({ lat: truck.lat, lng: truck.lng }); // 트럭 선택 시 지도 중심 이동

		if (mapRef.current) {
			mapRef.current.panTo(new kakao.maps.LatLng(truck.lat, truck.lng));
		}
	};

	return (
		<>
			<TheHeader />

			<div className="w-full h-screen">
				<Map
					center={mapCenter} // 지도 중심을 mapCenter로 설정
					className="w-full h-5/6"
					level={3}
					ref={mapRef}
				>
					{trucks.map((truck, index) => (
						<MapMarker
							key={index}
							position={{ lat: truck.lat, lng: truck.lng }}
							onClick={() => handleMarkerClick(truck)}
						>
							<div>{truck.name}</div>
						</MapMarker>
					))}

					<MapMarker position={currentPosition}>
						<div>현재 위치</div>
					</MapMarker>
				</Map>

				<div className="absolute z-10 w-full top-24">
					<UserCategory />
				</div>
			</div>

			<button className="fixed z-10 p-2 bg-white rounded-lg shadow-lg bottom-96 left-4">
				<GpsFix
					size={24}
					onClick={() => setMyLocation()}
				/>
			</button>

			<UserTruckList
				onExpandChange={setIsListExpanded}
				selectedTruck={selectedTruck}
				trucks={trucks}
			/>
			{!isListExpanded && <TheFooter />}
		</>
	);
};

export default UserMap;
