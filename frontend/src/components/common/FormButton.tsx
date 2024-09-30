import { IFormButton } from "@interface/common";

const FormButton = ({ buttonText, isValid, onClick }: IFormButton) => {
	return (
		<button
			type="button"
			className={`w-full h-20 rounded-md pl-5 py-4 text-3xl ${
				isValid ? "bg-gradient-to-r from-main to-boss text-white" : "bg-gray-light"
			}`}
			onClick={onClick}
			disabled={isValid ? false : true}
		>
			{buttonText}
		</button>
	);
};

export default FormButton;
