export interface IFoodTruckMessage {
	licenseNumber: string;
	name: string;
	introduction: string;
}

export interface IMenu {
	id: number;
	image?: string;
	name: string;
	price: number | string;
}

export interface IMenuForm extends IFormContainer {
	menu?: IMenu;
}

export interface IMenuMessage {
	name: string;
}

export interface IFormContainer {
	title: string;
	buttonText: string;
	onSubmit: () => void;
}

export interface ITodayMenu {
	id: number;
	image?: string | null;
	name: string;
	price: number;
	isSelected: boolean;
}

export interface ITodayMenuProps {
	todayMenu: ITodayMenu;
	onSelect: () => void;
}
