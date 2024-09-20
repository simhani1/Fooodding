import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Category from "@components/owner/Category";

import { IForm } from "@interface/common";
import { IFoodTruckMessage } from "@interface/owner";
import { categoryList } from "@utils/foodTruckData";
import { allElementsHaveValues, allPropertiesNotHaveValues } from "@utils/util";
import useFoodTruckStore from "@store/foodTruckStore";
import { FoodTruckReq } from "@swagger/data-contracts";

const FoodTruckForm = ({ buttonText, onSubmit }: IForm) => {
	const nav = useNavigate();

	const {
		name,
		licenseNumber,
		introduction,
		category,
		updateName,
		updateLicenseNumber,
		updateIntroduction,
		updateCategory,
	} = useFoodTruckStore();

	const [form, setForm] = useState<FoodTruckReq>({
		name,
		licenseNumber,
		introduction,
		category,
	});

	const [validateMessage, setValidateMessage] = useState<IFoodTruckMessage>({
		name: "",
		licenseNumber: "",
		introduction: "",
	});

	const isValid =
		allElementsHaveValues(form.name, form.licenseNumber, form.category) &&
		allPropertiesNotHaveValues(validateMessage);

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
		if (licenseNumber.length != 10) {
			setValidateMessage({ ...validateMessage, licenseNumber: "사업자 등록번호는 10자입니다." });
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
		onSubmit();
		updateName(form.name);
		updateLicenseNumber(form.licenseNumber);
		updateIntroduction(form.introduction);
		updateCategory(form.category);
		nav("/owner/foodtruck");
	};

	return (
		<form className="flex flex-col">
			<div className="flex flex-col gap-10">
				<InputField
					label="상호명"
					type="text"
					value={form.name}
					placeholder="상호명을 입력하세요(10자 이하, 필수)"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
					message={validateMessage.name}
				/>
				<InputField
					label="사업자 등록번호"
					type="text"
					value={form.licenseNumber}
					placeholder="사업자 등록번호를 입력하세요(10자, 필수)"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeLicenseNumber(event.target.value)
					}
					message={validateMessage.licenseNumber}
				/>
				<InputField
					label="소개글"
					type="text"
					value={form.introduction}
					placeholder="소개글을 입력하세요(20자 이하, 선택)"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeIntroduction(event.target.value)
					}
					message={validateMessage.introduction}
				/>
				<div className={"h-40 flex flex-col justify-between"}>
					<div className="flex flex-col">
						<label className="mb-3 text-3xl font-bold">카테고리</label>
						<div className="flex flex-wrap justify-start gap-5">
							{categoryList.map(({ name }) => (
								<Category
									className={name === form.category ? "bg-boss text-white" : "bg-white text-black"}
									buttonText={name}
									key={name}
									onClick={() => setForm({ ...form, category: name })}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<FormButton
				buttonText={buttonText}
				isValid={isValid}
				onClick={handleSubmit}
			/>
		</form>
	);
};

export default FoodTruckForm;
