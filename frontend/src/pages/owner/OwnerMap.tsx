import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polygon } from "react-kakao-maps-sdk";

import TheSideBar from "@components/common/TheSideBar";
import seoulPath from "@utils/seoul-si-path.json";
import gooPath from "@utils/seoul-goo-path.json";
import dongPath from "@utils/seoul-dong-path.json";
import transform from "@utils/transform-wgs84";
import WhiteButton from "@components/owner/WhiteButton";
import MapFloating from "@components/owner/MapFloating";
import { ILatLng } from "@interface/map";

const OwnerMap = () => {
	const [map, setMap] = useState<any>();
	const [level, setLevel] = useState(8);
	const [outer, setOuter] = useState<any>([]);

	// 초기 지도 설정 (서울시)
	useEffect(() => {
		if (map) {
			const bounds = new kakao.maps.LatLngBounds();

			// 폴리곤 경계 설정
			seoulPath.seoul[0].coordinates.forEach((coord) => {
				bounds.extend(new kakao.maps.LatLng(coord[1], coord[0]));
			});

			map.setBounds(bounds);
			map.setMaxLevel(8);

			// 지도의 줌, 스크롤 제한
			map.setZoomable(false);

			const outerPolygon = [
				{ lat: 85, lng: 180 },
				{ lat: 85, lng: -180 },
				{ lat: -85, lng: -180 },
				{ lat: -85, lng: 180 },
			];

			setOuter(outerPolygon);
		}
	}, [map]);

	// 서울 전체 보기 버튼
	const handleButtonClick = () => {
		map.setLevel(8);
		setLevel(8);
		map.setCenter(new kakao.maps.LatLng(37.5665, 126.978));
	};

	// 구별 폴리곤 설정
	const gooPolygons = gooPath.geometries.map((goo) => ({
		name: goo.name,
		path: transform({
			geometries: [{ coordinates: [goo.coordinates[0]] }],
		})[0],
	}));

	// 동별 폴리곤 설정
	const dongPolygons = dongPath.geometries.map((dong) => ({
		name: dong.name,
		path: transform({
			geometries: [{ coordinates: [dong.coordinates[0]] }],
		})[0],
	}));

	// 폴리곤별 중앙 좌표 구하기
	const calculatePolygonCenter = (path: ILatLng[]) => {
		let latSum = 0;
		let lngSum = 0;
		const num = path.length;

		path.forEach((point) => {
			latSum += point.lat;
			lngSum += point.lng;
		});

		return {
			lat: latSum / num,
			lng: lngSum / num,
		};
	};

	// 구 클릭 시 확대하는 함수
	const handlePolygonClick = (path: ILatLng[]) => {
		const center = calculatePolygonCenter(path);

		if (map) {
			map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
			map.setLevel(4);
			setLevel(4);
		}
	};

	return (
		<div
			id="boss-map"
			className="h-screen"
		>
			<TheSideBar />

			<WhiteButton onClick={handleButtonClick} />
			<MapFloating />

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
						fillOpacity={0.5}
					/>
				)}

				{/* 구별 폴리곤 */}
				{gooPolygons.map((gooPolygon, index) => (
					<Polygon
						key={index}
						path={gooPolygon.path}
						strokeColor="#000000"
						strokeWeight={8}
						fillColor="#000000"
						fillOpacity={0.01}
						zIndex={10}
						onClick={() => handlePolygonClick(gooPolygon.path)}
					/>
				))}

				{/* 폴리곤 중앙에 구 이름 표시 */}
				{gooPolygons.map((gooPolygon, index) => {
					const center = calculatePolygonCenter(gooPolygon.path);
					let adjustCenter = { ...center };

					switch (gooPolygon.name) {
						case "종로구":
							adjustCenter = {
								lat: center.lat - 0.01,
								lng: center.lng - 0.015,
							};
							break;
						case "강북구":
							adjustCenter = {
								lat: center.lat - 0.015,
								lng: center.lng + 0.005,
							};
							break;
						case "동대문구":
							adjustCenter = {
								lat: center.lat - 0.005,
								lng: center.lng + 0.0055,
							};
							break;
						case "서대문구":
							adjustCenter = {
								lat: center.lat - 0.005,
								lng: center.lng - 0.003,
							};
							break;
						case "성동구":
							adjustCenter = {
								lat: center.lat,
								lng: center.lng + 0.01,
							};
							break;
						case "광진구":
							adjustCenter = {
								lat: center.lat - 0.01,
								lng: center.lng - 0.005,
							};
							break;
						case "용산구":
							adjustCenter = {
								lat: center.lat - 0.005,
								lng: center.lng,
							};
							break;
						case "동작구":
							adjustCenter = {
								lat: center.lat + 0.01,
								lng: center.lng,
							};
							break;
						case "영등포구":
							adjustCenter = {
								lat: center.lat - 0.005,
								lng: center.lng,
							};
							break;
						case "송파구":
							adjustCenter = {
								lat: center.lat + 0.005,
								lng: center.lng - 0.015,
							};
							break;
						case "서초구":
							adjustCenter = {
								lat: center.lat + 0.005,
								lng: center.lng,
							};
							break;
						case "양천구":
							adjustCenter = {
								lat: center.lat + 0.002,
								lng: center.lng - 0.002,
							};
							break;
						case "강동구":
							adjustCenter = {
								lat: center.lat - 0.001,
								lng: center.lng - 0.006,
							};
							break;
						default:
							adjustCenter = center;
							break;
					}

					if (level <= 6) return null;

					return (
						<CustomOverlayMap
							key={index}
							position={{ lat: adjustCenter.lat, lng: adjustCenter.lng }}
							zIndex={10}
						>
							<div
								onClick={() => handlePolygonClick(gooPolygon.path)}
								className="px-1 text-lg text-white bg-black rounded"
							>
								{gooPolygon.name}
							</div>
						</CustomOverlayMap>
					);
				})}

				{/* 동별 폴리곤 */}
				{level <= 6 &&
					dongPolygons.map((dongPolygon, index) => (
						<Polygon
							key={index}
							path={dongPolygon.path}
							strokeWeight={4}
							strokeColor="#000000"
							zIndex={10}
						/>
					))}

				{/* 폴리곤 중앙에 동 이름 표시 */}
				{dongPolygons.map((dongPolygon, index) => {
					const center = calculatePolygonCenter(dongPolygon.path);
					let adjustCenter = { ...center };

					if (level > 6) return null;

					return (
						<CustomOverlayMap
							key={index}
							position={{ lat: adjustCenter.lat, lng: adjustCenter.lng }}
							zIndex={10}
						>
							<div
								onClick={() => handlePolygonClick(dongPolygon.path)}
								className="px-1 text-lg text-white rounded bg-red"
							>
								{dongPolygon.name}
							</div>
						</CustomOverlayMap>
					);
				})}
			</Map>
		</div>
	);
};

export default OwnerMap;
