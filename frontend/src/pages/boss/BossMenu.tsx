import Title from "@components/common/Title";
import Background from "@components/boss/Background";
import Menu from "@components/boss/Menu";

const BossMenu = () => {
	return (
		<Background>
			<>
				<div className="flex justify-between mb-10">
					<Title title="메뉴 관리" />
					<button className="text-3xl">추가</button>
				</div>
				<div className="flex flex-wrap gap-5">
					{MenuList.map((item) => (
						<Menu
							{...item}
							key={item.id}
						/>
					))}
				</div>
			</>
		</Background>
	);
};

export default BossMenu;

const MenuList = [
	{
		id: 1,
		image: "",
		name: "팥 붕어빵",
		price: 1000,
	},
	{
		id: 2,
		image: "",
		name: "슈크림 붕어빵",
		price: 1500,
	},
	{
		id: 3,
		image: "",
		name: "민트초코 붕어빵",
		price: 2000,
	},
	{
		id: 4,
		image: "",
		name: "파인애플 붕어빵",
		price: 2000,
	},
	{
		id: 5,
		image: "",
		name: "바나나 붕어빵",
		price: 2000,
	},
	{
		id: 6,
		image: "",
		name: "초코 붕어빵",
		price: 1500,
	},
	{
		id: 7,
		image: "",
		name: "녹차 붕어빵",
		price: 1500,
	},
	{
		id: 8,
		image: "",
		name: "땅콩 붕어빵",
		price: 1500,
	},
];
