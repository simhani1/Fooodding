import proj4 from "proj4";

const transform = (geoJson: any): { lat: number; lng: number }[][] => {
	const polygonPaths: { lat: number; lng: number }[][] = [];
	const utmk =
		"+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
	const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
	const transformer = proj4(utmk, wgs84);

	// geoJson 안의 모든 좌표 배열을 순회하여 변환
	geoJson.geometries.forEach((geometry: any) => {
		// 각 폴리곤이 MultiPolygon인 경우도 고려하여 모든 좌표 배열을 처리
		geometry.coordinates.forEach((polygon: any) => {
			const polygonPath: { lat: number; lng: number }[] = [];

			polygon.forEach((coord: number[]) => {
				// 좌표 변환 (UTMK -> WGS84)
				const [longi, lati] = transformer.forward([coord[0], coord[1]]);
				polygonPath.push({ lat: lati, lng: longi });
			});

			// 변환된 좌표 배열을 결과에 추가
			polygonPaths.push(polygonPath);
		});
	});

	return polygonPaths;
};

export default transform;
