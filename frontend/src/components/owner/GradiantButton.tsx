import { IGradiantButton } from "@interface/map";

import { CaretCircleRight } from "@phosphor-icons/react";

const GradiantButton = ({ onClick, text }: IGradiantButton) => {
	return (
		<div
			id="gradiant-button"
			className="absolute z-10 flex items-center justify-between p-6 rounded-lg shadow-sm laeding-none w-104 bg-gradient-to-r from-main to-boss right-8 top-8"
			onClick={onClick}
		>
			<div className="">
				<p className="mb-1 text-3xl font-bold text-white laeding-none">{text}</p>
				<p className="text-3xl font-bold text-white laeding-none">상권 정보 보기</p>
			</div>
			<CaretCircleRight
				size={48}
				weight="fill"
				color="#FFF"
			/>
		</div>
	);
};

export default GradiantButton;
