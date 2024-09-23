//트럭 정보
export interface ITruckInfo {
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
