declare namespace kakao.maps {
	class LatLng {
		constructor(lat: number, lng: number);
		getLat(): number; // 위도 반환 메서드 추가
		getLng(): number; // 경도 반환 메서드 추가
	}

	class LatLngBounds {
		extend(point: LatLng): void;
		contains(point: LatLng): boolean;
		containsBounds(bounds: LatLngBounds): boolean;
		getCenter(): LatLng;
	}

	class Map {
		constructor(container: HTMLElement, options: MapOptions);
		setCenter(latlng: LatLng): void;
		getCenter(): LatLng;
		setBounds(bounds: LatLngBounds);
		getBounds(): LatLngBounds;
		setZoomable(zoomable: boolean): void;
		setDraggable(draggable: boolean): void;
		panTo(latlng: LatLng): void;
	}

	interface MapOptions {
		center: LatLng;
		level: number;
		draggable?: boolean;
		zoomable?: boolean;
	}
}
