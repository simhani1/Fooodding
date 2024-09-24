import { ILoginCard } from "@interface/common";

const LoginCard = ({ title, children, onClick }: ILoginCard) => {
	return (
		<button
			className="flex flex-col items-center justify-center border border-black border-solid shadow-md sm:w-36 sm:h-40 w-80 h-88 rounded-xl"
			onClick={onClick}
		>
			<div className="flex flex-col items-center justify-around h-2/3">
				<span className="text-4xl sm:text-sm">{title}</span>
				<div className="flex justify-center w-2/3">{children}</div>
			</div>
		</button>
	);
};

export default LoginCard;
