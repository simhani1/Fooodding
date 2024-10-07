import { IWaitingInfo } from "./waiting";

//트럭 리스트 정보
export interface UserTruckListProps {
	onExpandChange: (expanded: boolean) => void;
	trucks: ITruckListInfo[];
	selectedTruck: ITruckListInfo | null;
}

export interface UserTruckProps {
	truck: ITruckListInfo | null;
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

export interface ITruckListInfo extends ITruckInfoDetail {
	mainMenuImg: string;
	menus: string;
	lat: number;
	long: number;
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
