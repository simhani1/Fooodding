import { IButton } from "@interface/common";

const NavButton = ({ buttonText, onClick }: IButton) => {
	return (
		<button
			type="button"
			className="box-border w-full pl-10 text-4xl font-semibold shadow-md rounded-2xl h-28"
			onClick={onClick}
		>
			<h3 className="text-left">{buttonText}</h3>
		</button>
	);
};

export default NavButton;
