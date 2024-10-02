import { ITodayMenuProps } from "@interface/owner";

import defaultImage from "@assets/default_menu_image.png";

const TodayMenu = ({ todayMenu, onSelect }: ITodayMenuProps) => {
	const { img, name, price, onSale } = todayMenu;

	return (
		<div
			className={`flex flex-col p-2 justify-around w-48 rounded-lg shadow-md h-60 ${
				onSale ? "border-2 border-solid border-boss" : ""
			}`}
			onClick={onSelect}
		>
			<img
				src={img || defaultImage}
				alt={name}
				className={`mx-auto border-2 border-black rounded-md w-32 h-32 p-1 ${onSale ? "" : "grayscale"}`}
			/>
			<div className="flex flex-col gap-1 text-center">
				<h4 className="text-xl font-bold ">{name}</h4>
				<span className="mb-1 text-lg">₩ {price.toLocaleString("ko-kr")}</span>
			</div>
		</div>
	);
};

export default TodayMenu;
