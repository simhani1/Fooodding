declare namespace kakao.maps {
	class LatLng {
		constructor(lat: number, lng: number);
	}

	class Map {
		constructor(container: HTMLElement, options: MapOptions);
		setCenter(latlng: LatLng): void;
		getCenter(): LatLng;
		panTo(latlng: LatLng): void;
	}

	interface MapOptions {
		center: LatLng;
		level: number;
		// 필요한 다른 옵션 속성들을 여기에 정의합니다.
	}
}
