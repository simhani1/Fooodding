import { IButton } from "@interface/map";

const WhiteButton = ({ onClick }: IButton) => {
	return (
		<div
			id="white-button"
			className="absolute z-10 px-4 py-3 bg-white border border-solid rounded-lg shadow-sm bottom-8 left-48 border-gray"
			onClick={onClick}
		>
			<p className="text-2xl font-bold text-center text-gray">서울 전체 보기</p>
		</div>
	);
};

export default WhiteButton;
