import { useEffect, useState } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";

import TheSideBar from "@components/common/TheSideBar";
import seoulPath from "@utils/seoul-si-path.json";
import gooPath from "@utils/seoul-goo-path.json";

const OwnerMap = () => {
	const [map, setMap] = useState<any>();
	const [level] = useState(8);
	const [outer, setOuter] = useState<any>([]);
	// const [goo, setGoo] = useState<any>();
	// const [dong, setDong] = useState<any>();

	// 초기 지도 설정 (서울시)
	useEffect(() => {
		if (map) {
			const bounds = new kakao.maps.LatLngBounds();

			// 폴리곤 경계 설정
			seoulPath.seoul[0].coordinates.forEach((coord) => {
				bounds.extend(new kakao.maps.LatLng(coord[1], coord[0]));
			});

			map.setBounds(bounds);
			map.setMaxLevel(8); // 줌아웃 제한

			// 지도의 줌, 드래그, 스크롤 제한
			map.setZoomable(false);
			map.setDraggable(false);

			const outerPolygon = [
				{ lat: 85, lng: 180 },
				{ lat: 85, lng: -180 },
				{ lat: -85, lng: -180 },
				{ lat: -85, lng: 180 },
			];

			setOuter(outerPolygon);
		}
	}, [map]);

	// 구별 폴리곤 설정
	const gooPolygons = gooPath.features.map((goo) => ({
		name: goo.properties.SIG_KOR_NM,
		path: goo.geometry.coordinates[0].map((coord) => ({
			lat: coord[1],
			lng: coord[0],
		})),
	}));

	return (
		<div
			id="boss-map"
			className="h-screen"
		>
			<TheSideBar />
			<Map
				center={{ lat: 37.5665, lng: 126.978 }}
				level={level}
				onCreate={(map) => setMap(map)}
				className="h-screen absolute right-0 w-[calc(100%-11rem)]"
			>
				{/* 대한민국 전체 폴리곤에서 서울만 비워두기 */}
				{outer.length > 0 && (
					<Polygon
						path={[outer, ...gooPolygons.map((gooPolygon) => gooPolygon.path)]}
						fillColor="#000000"
						fillOpacity={0.7}
						strokeWeight={0}
					/>
				)}

				{/* 구별 폴리곤 */}
				{gooPolygons.map((gooPolygon, index) => (
					<Polygon
						key={index}
						path={gooPolygon.path}
						strokeWeight={6}
						strokeColor="#F27387"
						zIndex={10}
					/>
				))}
			</Map>
		</div>
	);
};

export default OwnerMap;
