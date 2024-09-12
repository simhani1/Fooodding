import { ButtonProps } from "@interface/Button";

const Button = ({ className, children, onClick }: ButtonProps) => {
	return (
		<button
			className={className}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
