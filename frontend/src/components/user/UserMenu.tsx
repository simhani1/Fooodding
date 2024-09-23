import { IMenuInfo, IMenuProps } from "@interface/foodTruck";

import defaultMenuImage from "@assets/default_menu_image.png";

const UserMenu = ({ menuList }: IMenuProps) => {
	return (
		<div className="flex flex-wrap justify-between m-8">
			{menuList.map((menu: IMenuInfo) => (
				<div className="flex flex-col items-center p-6 border border-solid rounded-xl border-gray">
					<img
						src={menu.menuImg === "DEFAULT" ? defaultMenuImage : menu.menuImg}
						alt="메뉴 사진"
						className="object-cover w-32 h-32 mb-6"
					/>
					<span className="mb-2 text-lg font-semibold">{menu.menuName}</span>
					<span>{menu.price} 원</span>
				</div>
			))}
		</div>
	);
};

export default UserMenu;
