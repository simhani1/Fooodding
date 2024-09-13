import { useState } from "react";

import FormItem from "@components/owner/FormItem";
import FormInput from "@components/owner/FormInput";
import Category from "@components/owner/Category";

import useFoodTruckStore from "@store/foodTruckStore";
import { categoryList } from "@utils/foodTruckData";
import { FoodTruckReq } from "@swagger/data-contracts";
import { IFoodTruckForm } from "@interface/foodTruck";
import { allPropertiesHaveValues, allPropertiesNotHaveValues } from "@utils/util";

const FoodTruckForm = ({ children, onSubmit }: IFoodTruckForm) => {
	const {
		licenseNumber,
		name,
		introduction,
		category,
		updateLicenseNumber,
		updateName,
		updateIntroduction,
		updateCategory,
	} = useFoodTruckStore();

	const [form, setForm] = useState<FoodTruckReq>({
		name,
		licenseNumber,
		introduction,
		category,
	});

	const [validateMessage, setValidateMessage] = useState<FoodTruckReq>({
		name: "",
		licenseNumber: "",
		introduction: "",
		category: "",
	});

	const isValidate = allPropertiesHaveValues(form) && allPropertiesNotHaveValues(validateMessage);

	const handleChangeName = (name: string) => {
		setForm({ ...form, name });
		if (name.length === 0) {
			setValidateMessage({ ...validateMessage, name: "상호명을 입력해야 합니다." });
			return;
		}
		if (name.length > 10) {
			setValidateMessage({ ...validateMessage, name: "상호명은 10자 이하입니다." });
			return;
		}
		setValidateMessage({ ...validateMessage, name: "" });
	};

	const handleChangeLicenseNumber = (licenseNumber: string) => {
		setForm({ ...form, licenseNumber });
		if (licenseNumber.length === 0) {
			setValidateMessage({ ...validateMessage, licenseNumber: "사업자 등록번호를 입력해야 합니다." });
			return;
		}
		if (licenseNumber.length > 10) {
			setValidateMessage({ ...validateMessage, licenseNumber: "상호명은 10자입니다." });
			return;
		}
		setValidateMessage({ ...validateMessage, licenseNumber: "" });
	};

	const handleChangeIntroduction = (introduction: string) => {
		setForm({ ...form, introduction });
		if (introduction.length > 20) {
			setValidateMessage({ ...validateMessage, introduction: "소개글은 20자 이하입니다." });
			return;
		}
		setValidateMessage({ ...validateMessage, introduction: "" });
	};

	const handleSubmit = () => {
		updateName(form.name);
		updateLicenseNumber(form.licenseNumber);
		updateIntroduction(form.introduction);
		updateCategory(form.category);
		onSubmit();
	};

	return (
		<form className="flex flex-col gap-10">
			<FormItem
				label="상호명"
				isExtend={validateMessage.name !== ""}
			>
				<FormInput
					type="text"
					value={form.name}
					placeholder="상호명을 입력하세요(10자 이하, 필수)"
					disabled={false}
					message={validateMessage.name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
				/>
			</FormItem>
			<FormItem
				label="사업자 등록번호"
				isExtend={validateMessage.licenseNumber !== ""}
			>
				<FormInput
					type="text"
					value={form.licenseNumber}
					placeholder="사업자 등록번호를 입력하세요(10자, 필수)"
					disabled={false}
					message={validateMessage.licenseNumber}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeLicenseNumber(event.target.value)
					}
				/>
			</FormItem>
			<FormItem
				label="소개글"
				isExtend={validateMessage.introduction !== ""}
			>
				<FormInput
					type="text"
					value={form.introduction}
					placeholder="소개글을 입력하세요(20자 이하, 선택)"
					disabled={false}
					message={validateMessage.introduction}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeIntroduction(event.target.value)
					}
				/>
			</FormItem>
			<FormItem label="카테고리">
				<div className="overflow-x-scroll scrollbar-hide">
					<div className="w-300 flex justify-start gap-5">
						{categoryList.map(({ name }) => (
							<Category
								className={name === form.category ? "bg-boss text-white" : "bg-white text-black"}
								name={name}
								key={name}
								onClick={() => setForm({ ...form, category: name })}
							/>
						))}
					</div>
				</div>
			</FormItem>
			<button
				className={`w-full h-20 rounded-md pl-5 py-4 text-3xl ${isValidate ? "bg-gradient-to-b from-main to-boss text-white" : "bg-gray-light"}`}
				onClick={handleSubmit}
				disabled={isValidate ? false : true}
			>
				{children}
			</button>
		</form>
	);
};

export default FoodTruckForm;
