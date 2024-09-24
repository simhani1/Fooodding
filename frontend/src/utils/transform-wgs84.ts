import proj4 from "proj4";

const transform = (geoJson: any): { lat: number; lng: number }[][] => {
	const polygonPaths: { lat: number; lng: number }[][] = [];
	const utmk =
		"+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
	const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
	const transformer = proj4(utmk, wgs84);

	geoJson.geometries.forEach((geometry: any) => {
		const polygonPath: { lat: number; lng: number }[] = [];
		geometry.coordinates[0].forEach((coord: number[]) => {
			const [longi, lati] = transformer.forward([coord[0], coord[1]]);
			polygonPath.push({ lat: lati, lng: longi });
		});
		polygonPaths.push(polygonPath);
	});

	return polygonPaths;
};

export default transform;
