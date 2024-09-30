import { useState } from "react";

import Modal from "@components/common/Modal";
import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import Menu from "@components/owner/Menu";
import MenuForm from "@components/owner/MenuForm";

import { menuModalStyle } from "@utils/modalStyle";
import BackButton from "@components/owner/BackButton";

const OwnerMenu = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<div className="flex items-center gap-4">
							<BackButton />
							<Title title="메뉴 관리" />
						</div>
						<button
							className="text-3xl"
							onClick={() => openModal()}
						>
							추가
						</button>
					</div>
					<div className="">
						<div className="flex flex-wrap gap-6">
							{menuList.map((item) => (
								<Menu
									{...item}
									key={item.id}
								/>
							))}
						</div>
					</div>
					<Modal
						isOpen={isModalOpen}
						close={closeModal}
						style={menuModalStyle}
					>
						<MenuForm
							title="메뉴 추가"
							buttonText="추가"
							onSubmit={() => {}}
						/>
					</Modal>
				</>
			</Main>
		</Container>
	);
};

export default OwnerMenu;

const menuList = [
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
