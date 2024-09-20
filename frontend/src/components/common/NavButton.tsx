import { IButton } from "@interface/common";

const NavButton = ({ buttonText, onClick }: IButton) => {
	return (
		<button
			type="button"
			className="rounded-2xl shadow-md w-full h-28 pl-10 text-4xl font-semibold box-border"
			onClick={onClick}
		>
			<h3 className="text-left">{buttonText}</h3>
		</button>
	);
};

export default NavButton;
