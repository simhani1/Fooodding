declare namespace kakao.maps {
	class LatLng {
		constructor(lat: number, lng: number);
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
