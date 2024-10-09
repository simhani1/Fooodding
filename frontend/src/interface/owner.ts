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
	img?: string;
}

export interface IMenuProps extends IMenuFormData {
	foodTruckId: number;
	menuId: number;
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

//장사 시작
export interface ITodayMarketOpen {
	latitude: number;
	longitude: number;
	menuList: number[];
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

export interface IOwnerGraph {
	weekday: string;
}

export interface IWeather {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	weather: { main: string; description: string; icon: string }[];
	clouds: { all: number };
	wind: { speed: number; deg: number };
	dt_txt: string;
	pop: number;
}

export type IWeatherList = IWeather[];

export interface IWeatherProps {
	weather: IWeather;
}

export interface ILocation {
	lat: number;
	lng: number;
}

export interface IOwnerExceptionProps {
	title: string;
	content: string;
}

export interface IRecommendProps {
	placeName: string;
	target: string;
	count: number;
}
