import { IButton } from "@interface/common";

const Category = ({ className, buttonText, onClick }: IButton) => {
	return (
		<button
			type="button"
			className={`min-w-20 h-16 border-2 border-black rounded-md p-4 text-xl ${className}`}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};

export default Category;
