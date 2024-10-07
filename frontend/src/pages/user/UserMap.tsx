import { useEffect, useRef, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { ITruckListInfo } from "@interface/foodTruck";
import TheHeader from "@components/common/TheHeader";
import TheFooter from "@components/common/TheFooter";
import UserTruckList from "@components/user/UserTruckList";
import UserCategory from "@components/user/UserCategory";
import { getFoodTruckList } from "@api/user-api";

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

	const [selectedTruck, setSelectedTruck] = useState<ITruckListInfo | null>(null);
	const [trucks, setTrucks] = useState<ITruckListInfo[]>([]);

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
		getTruckList();
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

	//푸드트럭 리스트 불러오기
	const getTruckList = async () => {
		const myPosition = {
			lat: currentPosition.lat,
			long: currentPosition.lng,
		};

		try {
			const response = await getFoodTruckList(myPosition);
			setTrucks(response.data.data);
			console.log(response.data.data[0]);
		} catch (err) {
			console.error(err);
		}
	};

	// Marker 클릭 시 해당 트럭 선택
	const handleMarkerClick = (truck: ITruckListInfo) => {
		setSelectedTruck(truck);
		setMapCenter({ lat: truck.lat, lng: truck.long }); // 트럭 선택 시 지도 중심 이동

		if (mapRef.current) {
			mapRef.current.panTo(new kakao.maps.LatLng(truck.lat, truck.long));
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
					// minLevel={5}
				>
					{trucks.map((truck, index) => (
						<MapMarker
							key={index}
							position={{ lat: truck.lat, lng: truck.long }}
							onClick={() => handleMarkerClick(truck)}
							image={{
								src: "src/assets/foodtruckmarker.png", // 마커 이미지 경로
								size: {
									width: 36,
									height: 36,
								}, // 마커 이미지 크기
							}}
						>
							<div>{truck.name}</div>
						</MapMarker>
					))}

					<MapMarker
						position={currentPosition}
						image={{
							src: "/MapPin.png",
							size: {
								width: 36,
								height: 36,
							},
						}}
					></MapMarker>
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
