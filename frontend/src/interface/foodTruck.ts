import { IWaitingInfo } from "./waiting";

//트럭 리스트 정보
export interface ITruckInfo {
	foodTruckId: number;
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
	foodTruckId: number;
	licenseNumber: string;
	name: string;
	introduction: string;
	category: string;
	menuList: IMenuInfo[];
	isReserved: boolean; //예약전인지
	waitingInfo: IWaitingInfo; //웨이팅정보
}

export interface ITruckInfoProps {
	truck: ITruckInfoDetail;
	setTruck: React.Dispatch<React.SetStateAction<ITruckInfoDetail>>;
}

export interface IMenuInfo {
	isOnSale: boolean;
	menuId: number;
	name: string;
	price: number;
	img: string;
}

export interface IMenuProps {
	menuList?: IMenuInfo[];
}
