import { useState } from "react";

import InputField from "@components/common/InputField";
import MenuImage from "@components/owner/MenuImage";

import { IMenuFormProps, IMenuMessage } from "@interface/owner";
import { allElementsHaveValues, allPropertiesNotHaveValues } from "@utils/util";

const MenuForm = ({ title, buttonText, formData, setFormData, setImageFile, onSubmit }: IMenuFormProps) => {
	const [validateMessage, setValidateMessage] = useState<IMenuMessage>({
		name: "",
	});

	const isValid = allElementsHaveValues(formData.name, formData.price) && allPropertiesNotHaveValues(validateMessage);

	const handleChangeName = (name: string) => {
		setFormData({ ...formData, name });
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

		setFormData({ ...formData, price });
	};

	return (
		<form className="flex flex-col justify-between h-full p-3">
			<h1 className="text-5xl font-bold text-center">{title}</h1>
			<MenuImage
				image={formData.img}
				setImage={setImageFile}
			/>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<InputField
						type="text"
						value={formData.name}
						placeholder="메뉴 이름(8자 이하, 필수)"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
						message={validateMessage.name}
					/>
					<InputField
						type="text"
						value={formData.price > 0 ? formData.price : ""}
						placeholder="가격(999,999원 이하, 필수)"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangePrice(event.target.value)}
						message=""
					/>
				</div>
				<button
					type="button"
					className={`w-full h-18 rounded-md pl-5 py-4 text-3xl ${
						isValid ? "bg-gradient-to-b from-main to-boss text-white" : "bg-gray-light"
					}`}
					onClick={onSubmit}
					disabled={isValid ? false : true}
				>
					{buttonText}
				</button>
			</div>
		</form>
	);
};

export default MenuForm;
