import { useEffect, useRef, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { ITruckListInfo } from "@interface/foodTruck";
import TheHeader from "@components/common/TheHeader";
import TheFooter from "@components/common/TheFooter";
import UserTruckList from "@components/user/UserTruckList";
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

	const [lastTruckId, setLastTruckId] = useState<number | null>(null); // 마지막 푸드트럭 ID
	const [hasMoreTrucks, setHasMoreTrucks] = useState(true); // 더 많은 트럭이 있는지 여부
	const [isLocationSet, setIsLocationSet] = useState(false); // 사용자의 위치가 설정되었는지 여부

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
						setIsLocationSet(true); // 위치가 설정되었음을 표시

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
	}, []);

	// 위치가 설정된 이후 트럭 리스트 불러오기
	useEffect(() => {
		if (isLocationSet) {
			getTruckList();
		}
	}, [isLocationSet]);

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
			lng: currentPosition.lng,
		};

		try {
			const response = await getFoodTruckList(myPosition);
			const data = response.data.data;

			console.log(data);

			setTrucks(data);

			if (data.length === 0) return;

			setLastTruckId(data[data.length - 1].foodTruckId); // 마지막 트럭의 id 저장
		} catch (err) {
			console.error(err);
		}
	};

	// 더 많은 푸드트럭을 불러오기 (lft-id 사용)
	const loadMoreTrucks = async () => {
		if (!lastTruckId || !hasMoreTrucks) return;

		try {
			const response = await getFoodTruckList({
				lat: currentPosition.lat,
				lng: currentPosition.lng,
				"lft-id": lastTruckId,
			});

			const data = response.data.data;

			if (data.length === 0) {
				// 더 이상 불러올 트럭이 없는 경우
				setHasMoreTrucks(false);
				return;
			}

			setTrucks((prevTrucks) => [...prevTrucks, ...data]);
			setLastTruckId(data[data.length - 1]?.foodTruckId); // 새로운 마지막 트럭의 id 저장
		} catch (err) {
			console.error(err);
		}
	};

	// Marker 클릭 시 해당 트럭 선택
	const handleMarkerClick = (truck: ITruckListInfo) => {
		setSelectedTruck(truck);
		setMapCenter({ lat: truck.latitude, lng: truck.longitude }); // 트럭 선택 시 지도 중심 이동

		if (mapRef.current) {
			mapRef.current.panTo(new kakao.maps.LatLng(truck.latitude, truck.longitude));
		}
	};

	return (
		<>
			<TheHeader />

			<div className="w-full h-screen">
				{trucks.length > 0 && (
					<Map
						center={mapCenter}
						className="w-full h-screen"
						level={5}
						ref={mapRef}
						onCreate={(map) => (mapRef.current = map)}
					>
						{trucks.map((truck, index) => (
							<MapMarker
								key={index}
								position={{ lat: truck.latitude, lng: truck.longitude }}
								onClick={() => handleMarkerClick(truck)}
								image={{
									src: "/foodtruckmarker.png", // 마커 이미지 경로
									size: {
										width: 36,
										height: 36,
									},
								}}
							>
								<div className="border-none">{truck.name}</div>
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
						/>
					</Map>
				)}
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
				onScrollEnd={loadMoreTrucks} // 리스트 끝에 도달 시 더 많은 푸드트럭 로드
			/>

			{!isListExpanded && <TheFooter />}
		</>
	);
};

export default UserMap;
