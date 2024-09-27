import { CaretCircleRight } from "@phosphor-icons/react";

const GradiantButton = () => {
	return (
		<div
			id="gradiant-button"
			className="absolute flex items-center justify-between p-4 rounded-lg shadow-sm w-72 bg-gradient-to-r from-main to-boss right-8 top-8"
		>
			<p className="text-3xl font-bold text-white">상권 정보 보기</p>
			<CaretCircleRight
				size={40}
				weight="fill"
				color="#FFF"
			/>
		</div>
	);
};

export default GradiantButton;
