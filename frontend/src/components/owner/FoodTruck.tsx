import FormInput from "@components/owner/FormInput";
import FormItem from "@components/owner/FormItem";
import Category from "@components/owner/Category";

import useFoodTruckStore from "@store/foodTruckStore";

const FoodTruck = () => {
	const { licenseNumber, name, introduction, category } = useFoodTruckStore();
	return (
		<div className="flex flex-col gap-10">
			<FormItem label="상호명">
				<FormInput
					value={name}
					disabled={true}
				/>
			</FormItem>
			<FormItem label="사업자 등록번호">
				<FormInput
					value={licenseNumber}
					disabled={true}
				/>
			</FormItem>
			<FormItem label="소개글">
				<FormInput
					value={introduction}
					disabled={true}
				/>
			</FormItem>
			<FormItem label="카테고리">
				<div>
					<Category
						className="bg-boss text-white"
						name={category}
					/>
				</div>
			</FormItem>
		</div>
	);
};

export default FoodTruck;
