import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TheSideBar from "@components/common/TheSideBar";
import WhiteButton from "@components/owner/WhiteButton";
import GradiantButton from "@components/owner/GradiantButton";
import MapFloating from "@components/owner/MapFloating";
import MapDetail from "@components/owner/MapDetail";
import seoulPath from "@utils/seoul-si-path.json";
import gooPath from "@utils/seoul-goo-path.json";
import dongPath from "@utils/seoul-dong-path.json";
import transform from "@utils/transform-wgs84";
import permissionSection from "@utils/food-truck-permission.json";
import { IFeatureCollection, ILatLng, IGooPolygonPath, IDongPolygonPath } from "@interface/map";
// import { ICongestion } from "@interface/api";
// import { getCongestion, getRecommend } from "@api/data-api";

import { CustomOverlayMap, Map, MapMarker, Polygon } from "react-kakao-maps-sdk";

const OwnerMap = () => {
	const location = useLocation();
	const state = location.state;

	const [map, setMap] = useState<any>();
	const [level, setLevel] = useState(8);
	const [outer, setOuter] = useState<any>([]);
	const [selectDong, setSelectDong] = useState<string>(state?.dong || "");
	const [isButton, setIsButton] = useState<boolean>(false);
	const [showDetail, setShowDetail] = useState<boolean>(state?.dong ? true : false);
	const [activeSection, setActiveSection] = useState<string>("recommend");
	// const [congestionData, setCongestionData] = useState<ICongestion[]>([]);

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

			const outerPolygon = [
				{ lat: 85, lng: 180 },
				{ lat: 85, lng: -180 },
				{ lat: -85, lng: -180 },
				{ lat: -85, lng: 180 },
			];

			setOuter(outerPolygon);

			// 추천구역 설정
			// const fetchRecommendData = async () => {
			// 	try {
			// 		if (sessionStorage.getItem("foodTruckId")) {
			// 			console.log(sessionStorage.getItem("foodTruckId"));
			// 			const response = await getRecommend(sessionStorage.getItem("foodTruckId")!);
			// 			console.log(response);
			// 			return;
			// 		}

			// 		alert("푸드트럭 등록 후 이용해주세요.");
			// 	} catch (error) {
			// 		console.error(error);
			// 	}
			// };

			// fetchRecommendData();

			// 혼잡도 설정
			// const fetchCongestionData = async () => {
			// 	try {
			// 		const response = await getCongestion();
			// 		setCongestionData(response.data);
			// 	} catch (error) {
			// 		console.error(error);
			// 	}
			// };

			// fetchCongestionData();
		}
	}, [map]);

	// MapFloating 상태에 따른 지도 표시 초기 설정
	////////// 임시
	const recommendMark = [
		"일원1동",
		"서초2동",
		"종암1동",
		"수유3동",
		"창5동",
		"중계4동",
		"잠실2동",
		"신림동",
		"천호3동",
		"면목4동",
	];
	//////////

	const permissionMark = permissionSection.map((section) => ({
		name: section.name,
		address: section.address,
		path: [section.lat, section.lng],
	}));

	// 동 혼잡도별 색칠하기
	// const colorMap = ["#EE494C", "#67C7FF", "#56E87B", "#F5CE0C"];

	// const congestionColor = (dongCode: string) => {
	// 	const findCongestion = congestionData.find((item) => {
	// 		return item["행정동코드"] === dongCode;
	// 	});

	// 	if (findCongestion) {
	// 		const congestionLevel = findCongestion["혼잡도"];
	// 		return colorMap[congestionLevel % 4];
	// 	}

	// 	return "#D3D3D3";
	// };

	////////// 임시
	const colorMap = ["#EE494C", "#F5CE0C", "#56E87B", "#67C7FF"];
	const length = 454;
	const congestionColor = Array.from({ length }, (_, index) => (index % 4) + 1);
	//////////

	// 서울 전체 보기 버튼
	const handleButtonClick = () => {
		map.setLevel(8);
		setLevel(8);
		map.setCenter(new kakao.maps.LatLng(37.5665, 126.978));
		setIsButton(false);
		setSelectDong("");
	};

	// 구별 폴리곤 설정
	const gooPolygons: IGooPolygonPath[] = gooPath.geometries.map((goo) => ({
		name: goo.name,
		path: transform({
			geometries: [{ coordinates: [goo.coordinates[0]] }],
		})[0],
	}));

	// 동별 폴리곤 설정
	const dongPolygons: IDongPolygonPath[] = (dongPath as IFeatureCollection).features.map((dong) => ({
		name: dong.properties.ADM_DR_NM,
		code: dong.properties.ADM_DR_CD,
		path: dong.geometry.coordinates.flatMap((polygon) =>
			polygon.flatMap((ring) =>
				ring.map((coord) => {
					if (Array.isArray(coord) && coord.length === 2) {
						const [lng, lat] = coord;
						return {
							lat,
							lng,
						};
					}

					throw new Error("Invalid coordinate format");
				}),
			),
		),
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
	const handleGooClick = (path: ILatLng[]) => {
		const center = calculatePolygonCenter(path);

		if (map) {
			map.setLevel(6);
			setLevel(6);
			map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
		}
	};

	// 동 클릭 시 확대하면서 이름 설정하는 함수
	const handleDongClick = (path: ILatLng[], dongName: string) => {
		const center = calculatePolygonCenter(path);

		if (map) {
			map.setLevel(5);
			setLevel(5);
			map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
		}

		setSelectDong(dongName);
		setIsButton(true);
		setShowDetail(false);
	};

	// 버튼 클릭 시 동 상세 모달을 표시하는 함수
	const handleDetailButtonClick = () => {
		setIsButton(false);
		setShowDetail(true);
	};

	// 마커 클릭 시 요소 띄우기
	const [isOpenTruck, setIsOpenTruck] = useState<boolean[]>(new Array(permissionMark.length).fill(false));

	const toggleOpenTruck = (index: number) => {
		setIsOpenTruck((prev) => prev.map((isOpenTruck, i) => (i === index ? !isOpenTruck : isOpenTruck)));
	};

	return (
		<div
			id="boss-map"
			className="h-screen"
		>
			<TheSideBar />
			<WhiteButton onClick={handleButtonClick} />

			{!isButton ? (
				<MapFloating setActiveSection={setActiveSection} />
			) : (
				<GradiantButton
					onClick={handleDetailButtonClick}
					text={selectDong}
				/>
			)}

			<Map
				center={{ lat: 37.5665, lng: 126.978 }}
				level={level}
				onCreate={(map) => setMap(map)}
				className="z-0 h-screen absolute right-0 w-[calc(100%-10rem)]"
			>
				{/* 대한민국 전체 폴리곤에서 서울만 비워두기 */}
				{outer.length > 0 && (
					<Polygon
						path={[outer, ...gooPolygons.map((gooPolygon) => gooPolygon.path)]}
						fillColor="#000000"
						fillOpacity={0.5}
						strokeColor="none"
					/>
				)}

				{/* 추천구역 & 허가구역 & 혼잡도 표시 */}
				{activeSection === "recommend"
					? dongPolygons
							.filter((dong) => recommendMark.some((recommend) => dong.name.includes(recommend)))
							.map((dong, index) => {
								return (
									<Polygon
										key={index}
										path={dong.path}
										strokeColor="#F27387"
										strokeWeight={2}
										fillColor="#F27387"
										fillOpacity={0.8}
										onClick={() => handleDongClick(dong.path, dong.name)}
										zIndex={10}
									/>
								);
							})
					: activeSection === "permission"
					? permissionMark.map((mark, index) => (
							<div key={index}>
								<MapMarker
									position={{ lat: mark.path[0], lng: mark.path[1] }}
									onClick={() => toggleOpenTruck(index)}
									image={{
										src: "/MapTruckPin.png",
										size: {
											width: level === 8 ? 64 : 96,
											height: level === 8 ? 64 : 96,
										},
									}}
								>
									{isOpenTruck[index] && (
										<div className="p-2 mx-auto text-2xl font-semibold text-center truncate">
											{mark.name}
										</div>
									)}
								</MapMarker>
							</div>
					  ))
					: dongPolygons.map((dongPolygon, index) => {
							const colorKey = congestionColor[index % congestionColor.length]; // 색상 키 가져오기
							const fillColor = colorMap[colorKey];

							// const dongCode = dongPolygon.code;
							// const fillColor = congestionColor(dongCode);

							return (
								<Polygon
									key={index}
									path={dongPolygon.path}
									strokeColor={fillColor}
									strokeWeight={2}
									fillColor={fillColor}
									fillOpacity={0.5}
									zIndex={10}
									onClick={() => handleDongClick(dongPolygon.path, dongPolygon.name)}
								/>
							);
					  })}

				{/* 구별 폴리곤 */}
				{level === 8
					? gooPolygons.map((gooPolygon, index) => (
							<Polygon
								key={index}
								path={gooPolygon.path}
								strokeColor="#000000"
								strokeWeight={2}
								fillColor="#000000"
								fillOpacity={0.01}
								zIndex={10}
								onClick={() => handleGooClick(gooPolygon.path)}
							/>
					  ))
					: gooPolygons.map((gooPolygon, index) => (
							<Polygon
								key={index}
								path={gooPolygon.path}
								strokeColor="#000000"
								strokeWeight={5}
								fillColor="#000000"
								fillOpacity={0.01}
								onClick={() => handleGooClick(gooPolygon.path)}
							/>
					  ))}

				{/* 폴리곤 중앙에 구 이름 표시 */}
				{level === 8 &&
					gooPolygons.map((gooPolygon, index) => {
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

						return (
							<CustomOverlayMap
								key={index}
								position={{ lat: adjustCenter.lat, lng: adjustCenter.lng }}
							>
								<div
									onClick={() => handleGooClick(gooPolygon.path)}
									className="px-1 text-lg text-white bg-black rounded"
								>
									{gooPolygon.name}
								</div>
							</CustomOverlayMap>
						);
					})}

				{/* 동별 폴리곤 */}
				{level < 8 &&
					dongPolygons.map((dongPolygon, index) => (
						<Polygon
							key={index}
							path={dongPolygon.path}
							strokeColor="#000000"
							strokeWeight={2}
							fillColor="#FE8C68"
							fillOpacity={selectDong === dongPolygon.name ? 0.5 : 0.01}
							zIndex={10}
							onClick={() => handleDongClick(dongPolygon.path, dongPolygon.name)}
						/>
					))}
			</Map>

			{/* 동별 상세 모달 */}
			{showDetail && selectDong && (
				<MapDetail
					dongName={selectDong}
					setShowDetail={setShowDetail}
				/>
			)}
		</div>
	);
};

export default OwnerMap;
