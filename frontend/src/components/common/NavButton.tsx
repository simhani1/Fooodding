import { IButton } from "@interface/common";

const NavButton = ({ buttonText, onClick }: IButton) => {
	return (
		<button
			type="button"
			className="box-border w-full px-8 py-4 text-3xl font-semibold border border-solid shadow-md border-gray-light rounded-2xl h-28"
			onClick={onClick}
		>
			<h3 className="text-left">{buttonText}</h3>
		</button>
	);
};

export default NavButton;
