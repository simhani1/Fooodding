import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import TheHeader from "@components/common/TheHeader";
import TheFooter from "@components/common/TheFooter";

const UserMap = () => {
	const [currentPosition, setCurrentPosition] = useState({
		lat: 37.566826,
		lng: 126.9786567,
	});

	useEffect(() => {
		// 사용자 현재 위치 가져오기
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCurrentPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error occurred while fetching location:", error);
				},
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	}, []);

	return (
		<>
			<TheHeader />
			<div className="w-full h-screen">
				<Map
					center={currentPosition}
					className="w-full h-full"
					level={3}
				>
					<MapMarker position={currentPosition}>
						<div style={{ color: "#000" }}>현재 위치</div>
					</MapMarker>
				</Map>
			</div>
			<TheFooter />
		</>
	);
};

export default UserMap;
