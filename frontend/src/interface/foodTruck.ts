//트럭 리스트 정보
export interface ITruckInfo {
	id: number;
	name: string;
	content: string;
	menu: string[];
	img?: string;
	lat: number;
	lng: number;
}

export interface UserTruckListProps {
	onExpandChange: (expanded: boolean) => void;
	trucks: ITruckInfo[];
	selectedTruck: ITruckInfo | null;
}

export interface UserTruckProps {
	truck: ITruckInfo | null;
}

//트럭 상세 정보
export interface ITruckInfoDetail {
	id: number;
	name: string;
	content: string;
	isReserved: boolean;
	img?: string;
	menuList?: IMenuInfo[];
}

export interface ITruckInfoProps {
	truck: ITruckInfoDetail;
}

export interface IMenuInfo {
	menuName: string;
	price: number;
	menuImg: string;
}

export interface IMenuProps {
	menuList?: IMenuInfo[];
}
