import React from "react";

export interface ICategory {
	className: string;
	name: string;
	onClick?: () => void;
}

export interface IFoodTruckForm {
	children?: JSX.Element;
	onSubmit: () => void;
}

export interface IInput {
	type?: string;
	value?: string;
	placeholder?: string;
	disabled: boolean;
	message?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormItem {
	label: string;
	children: JSX.Element;
	isExtend?: boolean;
}
