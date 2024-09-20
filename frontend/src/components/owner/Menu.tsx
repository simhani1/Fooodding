import { useState } from "react";

import Modal from "@components/common/Modal";
import MenuForm from "@components/owner/MenuForm";

import { IMenu } from "@interface/owner";
import defaultImage from "@assets/default_menu_image.png";
import { menuModalStyle } from "@utils/modalStyle";

const Menu = ({ id, image, name, price }: IMenu) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleUpdate = () => {};
	const handleDelete = () => {};

	return (
		<div className="flex flex-col justify-around w-56 rounded-md shadow-md h-72">
			<img
				src={image || defaultImage}
				alt="no image"
				className="mx-auto border-2 border-black rounded-md w-36 h-36"
			/>
			<div className="flex flex-col gap-1 text-center">
				<h4 className="text-2xl">{name}</h4>
				<span className="text-2xl">₩{price.toLocaleString("ko-kr")}</span>
			</div>
			<div className="flex justify-around w-3/4 mx-auto">
				<button
					className="text-xl"
					onClick={() => openModal()}
				>
					수정
				</button>
				<button
					className="text-xl"
					onClick={handleDelete}
				>
					삭제
				</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				close={closeModal}
				style={menuModalStyle}
			>
				<MenuForm
					title="메뉴 수정"
					buttonText="수정 완료"
					menu={{ id, image, name, price }}
					onSubmit={handleUpdate}
				/>
			</Modal>
		</div>
	);
};

export default Menu;
