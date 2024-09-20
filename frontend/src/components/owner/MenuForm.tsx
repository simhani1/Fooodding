import { useState } from "react";

import Modal from "@components/common/Modal";

import { IMenu, IMenuForm, IMenuMessage } from "@interface/owner";
import defaultImage from "@assets/default_menu_image.png";
import { allElementsHaveValues, allPropertiesNotHaveValues } from "@utils/util";
import { imageModalStyle } from "@utils/modalStyle";
import { Camera } from "@phosphor-icons/react";
import InputField from "@components/common/InputField";

const MenuForm = ({ title, buttonText, menu, onSubmit }: IMenuForm) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const [form, setForm] = useState<IMenu>({
		id: (menu && menu.id) || 0,
		image: (menu && menu.image) || defaultImage,
		name: (menu && menu.name) || "",
		price: (menu && menu.price) || "",
	});

	const [validateMessage, setValidateMessage] = useState<IMenuMessage>({
		name: "",
	});

	const isValid = allElementsHaveValues(form.name, form.price) && allPropertiesNotHaveValues(validateMessage);

	const handleChangeImage = () => {};

	const handleChangeName = (name: string) => {
		setForm({ ...form, name });
		if (name.length === 0) {
			setValidateMessage({ ...validateMessage, name: "메뉴명을 입력해야 합니다." });
			return;
		}
		if (name.length > 8) {
			setValidateMessage({ ...validateMessage, name: "메뉴명은 8자 이하입니다." });
			return;
		}
		setValidateMessage({ ...validateMessage, name: "" });
	};

	const handleChangePrice = (inputValue: string) => {
		if (!/^[0-9]*$/.test(inputValue)) {
			return;
		}

		const price = Number(inputValue);

		if (price > 999999) {
			return;
		}

		setForm({ ...form, price: price > 0 ? price : "" });
	};

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<form className="flex flex-col justify-between h-full p-3">
			<h1 className="text-5xl font-bold text-center">{title}</h1>
			<div className="relative">
				<div className="mx-auto border-2 border-black border-solid w-52 h-52 rounded-3xl">
					<img
						src={form.image}
						alt="no image"
						className="w-full h-full opacity-40"
					/>
				</div>
				<div
					onClick={openModal}
					className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
				>
					<Camera className="w-2/5 h-2/5" />
				</div>
				<Modal
					isOpen={isModalOpen}
					close={closeModal}
					style={imageModalStyle}
				>
					<button
						className="block h-full mx-auto my-auto text-2xl text-center"
						onClick={handleChangeImage}
					>
						사진 업로드
					</button>
				</Modal>
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<InputField
						type="text"
						value={form.name}
						placeholder="메뉴 이름(8자 이하, 필수)"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
						message={validateMessage.name}
					/>
					<InputField
						type="text"
						value={form.price}
						placeholder="가격(999,999원 이하, 필수)"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangePrice(event.target.value)}
						message=""
					/>
				</div>
				<button
					type="button"
					className={`w-full h-18 rounded-md pl-5 py-4 text-3xl ${isValid ? "bg-gradient-to-b from-main to-boss text-white" : "bg-gray-light"}`}
					onClick={handleSubmit}
					disabled={isValid ? false : true}
				>
					{buttonText}
				</button>
			</div>
		</form>
	);
};

export default MenuForm;
