import { ILoginCard } from "@interface/common";

const LoginCard = ({ title, children, onClick }: ILoginCard) => {
	return (
		<button
			className="flex flex-col items-center justify-center border border-black border-solid shadow-md w-80 h-88 rounded-xl"
			onClick={onClick}
		>
			<div className="flex flex-col items-center justify-around h-1/2">
				<span className="text-4xl">{title}</span>
				<div className="flex justify-center w-2/3 border-b-2 border-black border-solid">{children}</div>
			</div>
		</button>
	);
};

export default LoginCard;
