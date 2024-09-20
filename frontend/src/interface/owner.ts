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

export interface IMenuForm {
	title: string;
	buttonText: string;
	menu?: IMenu;
	onSubmit: () => void;
}

export interface IMenuMessage {
	name: string;
}
