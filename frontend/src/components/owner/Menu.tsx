import { MenuProps } from "@interface/Menu";
import defaultImage from "@assets/default_menu_image.png";

const Menu = ({ image, name, price }: MenuProps) => {
	return (
		<div className="w-56 h-80 flex flex-col justify-around  rounded-md shadow-md">
			<img
				src={image || defaultImage}
				alt="no image"
				className="w-36 h-36 border-2 border-black rounded-md mx-auto"
			/>
			<div className="flex flex-col gap-1 text-center">
				<h4 className="text-2xl">{name}</h4>
				<span className="text-2xl">₩{price.toLocaleString("ko-KR")}</span>
			</div>
			<div className="w-3/4 flex justify-around mx-auto">
				<button className="text-xl">편집</button>
				<button className="text-xl">삭제</button>
			</div>
		</div>
	);
};

export default Menu;
