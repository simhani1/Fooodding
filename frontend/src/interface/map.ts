export interface IWhiteButton {
	onClick: () => void;
}

export interface ILatLng {
	lat: number;
	lng: number;
}

export interface IPolygonPath {
	name: string;
	path: ILatLng[];
}
