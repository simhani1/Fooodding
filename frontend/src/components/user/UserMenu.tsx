import { IMenuInfo, IMenuProps } from "@interface/foodTruck";

import defaultMenuImage from "@assets/default_menu_image.png";

const UserMenu = ({ menuList }: IMenuProps) => {
	return (
		<div className="flex flex-wrap justify-between m-8">
			{menuList && menuList.length > 0 ? (
				menuList.map((menu: IMenuInfo, index) => (
					<div
						key={index}
						className="flex flex-col items-center p-6 border border-solid rounded-xl border-gray"
					>
						<img
							src={menu.img === "DEFAULT" ? defaultMenuImage : menu.img}
							alt="메뉴 사진"
							className="object-cover w-32 h-32 mb-6"
						/>
						<span className="mb-2 text-lg font-semibold">{menu.name}</span>
						<span>{menu.price} 원</span>
					</div>
				))
			) : (
				<p className="w-full text-lg font-semibold text-center">메뉴가 없습니다</p>
			)}
		</div>
	);
};

export default UserMenu;
