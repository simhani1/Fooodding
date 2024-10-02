import { Dispatch, SetStateAction } from "react";

import { IFoodTruckDTO } from "@interface/api";

export interface IFoodTruckMessage {
	licenseNumber: string;
	name: string;
	introduction: string;
}

export interface IMenuRequired {
	name: string;
	price: number;
}

export interface IMenuFormData extends IMenuRequired {
	image?: string;
}

export interface IMenu extends IMenuFormData {
	id: number;
}

export interface IMenuForm extends IFormContainer {
	menu?: IMenu;
}

export interface IMenuMessage {
	name: string;
}

export interface IMenuImage {
	image: string | undefined;
	setImage: (file: File) => void;
}

export interface IMenuFormProps {
	title: string;
	buttonText: string;
	formData: IMenuFormData;
	setFormData: Dispatch<SetStateAction<IMenuFormData>>;
	setImageFile: Dispatch<SetStateAction<File | undefined>>;
	onSubmit: () => void;
}

export interface IForm {
	buttonText: string;
	onSubmit: () => void;
}

export interface IFormContainer extends IForm {
	title: string;
}

export interface IFoodTruckForm extends IForm {
	formData: IFoodTruckDTO;
	setFormData: Dispatch<SetStateAction<IFoodTruckDTO>>;
}

export interface ITodayMenu {
	menuId: number;
	img?: string | null;
	name: string;
	price: number;
	onSale: boolean;
}

export interface ITodayMenuProps {
	todayMenu: ITodayMenu;
	onSelect: () => void;
}

export type Category =
	| "KOREAN"
	| "JAPANESE"
	| "CHINESE"
	| "WESTERN"
	| "BUNSIK"
	| "ASIAN"
	| "FAST_FOOD"
	| "CAFE_DESSERT";
