// 페이지, 컴포넌트 인터페이스
export interface IButton {
	onClick: () => void;
}

export interface IGradiantButton extends IButton {
	text: string;
}

export interface IMapDetail {
	dongName: string;
	setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBarGraph {
	data: any;
	labels: any;
}

export interface IFloating {
	setActiveSection: (section: string) => void;
}

// 지도 폴리곤 관련 인터페이스
export interface ILatLng {
	lat: number;
	lng: number;
}

export interface IGooPolygonPath {
	name: string;
	path: ILatLng[];
}

export interface IDongPolygonPath {
	name: string;
	code: string;
	path: ILatLng[];
}

export interface IGeometry {
	type: string;
	coordinates: number[][][][];
}

export interface IFeatureProperties {
	BASE_YEAR: string;
	ADM_DR_CD: string;
	ADM_DR_NM: string;
}

export interface IFeature {
	type: string;
	properties: IFeatureProperties;
	geometry: IGeometry;
}

export interface IFeatureCollection {
	type: string;
	name: string;
	crs: {
		type: string;
		properties: {
			name: string;
		};
	};
	features: IFeature[];
}

//내 위치 좌표
export interface IMyPosition {
	lat: number;
	lng: number;
	"lft-id"?: number;
}
