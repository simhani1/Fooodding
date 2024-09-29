import { useState } from "react";

import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Category from "@components/owner/Category";

import { Category as CategoryType, IFoodTruckForm, IFoodTruckMessage } from "@interface/owner";
import { categories } from "@utils/foodTruckData";
import { allElementsHaveValues, allPropertiesNotHaveValues } from "@utils/util";

const FoodTruckForm = ({ formData, buttonText, setFormData, onSubmit }: IFoodTruckForm) => {
	const [validateMessage, setValidateMessage] = useState<IFoodTruckMessage>({
		name: "",
		licenseNumber: "",
		introduction: "",
	});

	const isValid =
		allElementsHaveValues(formData.name, formData.licenseNumber, formData.category) &&
		allPropertiesNotHaveValues(validateMessage);

	const handleChangeName = (name: string) => {
		setFormData({ ...formData, name });
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
		setFormData({ ...formData, licenseNumber });
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
		setFormData({ ...formData, introduction });
		if (introduction.length > 20) {
			setValidateMessage({ ...validateMessage, introduction: "소개글은 20자 이하입니다." });
			return;
		}
		setValidateMessage({ ...validateMessage, introduction: "" });
	};

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<form className="flex flex-col">
			<div className="flex flex-col gap-10">
				<InputField
					label="상호명"
					type="text"
					value={formData.name}
					placeholder="상호명을 입력하세요(10자 이하, 필수)"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
					message={validateMessage.name}
				/>
				<InputField
					label="사업자 등록번호"
					type="text"
					value={formData.licenseNumber}
					placeholder="사업자 등록번호를 입력하세요(10자, 필수)"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeLicenseNumber(event.target.value)
					}
					message={validateMessage.licenseNumber}
				/>
				<InputField
					label="소개글"
					type="text"
					value={formData.introduction}
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
							{(Object.entries(categories) as [CategoryType, string][]).map(([key, value]) => (
								<Category
									className={key === formData.category ? "bg-boss text-white" : "bg-white text-black"}
									buttonText={value}
									key={value}
									onClick={() => setFormData({ ...formData, category: key })}
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
