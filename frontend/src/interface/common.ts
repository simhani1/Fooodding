export interface IForm {
	buttonText: string;
	onSubmit: () => void;
}

export interface IContainer {
	children: JSX.Element;
}

export interface IButton {
	buttonText: string;
	className?: string;
	onClick: () => void;
}

export interface ITextField {
	label?: string;
	value: string | number | undefined;
}

export interface IInputField extends ITextField {
	type: string;
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	message: string;
}

export interface IFormButton extends IButton {
	isValid: boolean;
}

export interface IAnnouncementButton extends IButton {
	place?: string;
	duration?: string;
	lastDate?: string;
	link?: string;
}

export interface IModal {
	isOpen: boolean;
	style: object;
	children: JSX.Element;
	close: () => void;
}

export interface ILoginCard {
	title: string;
	children: JSX.Element;
	onClick: () => void;
}

export type PathType = {
	role: string;
};

export type ObjectType<V> = { [key: string]: V };
