import { useState } from "react";

const categories = ["한식", "일식", "양식", "중식", "분식", "아시안", "패스트푸드", "카페/디저트"];

const UserCategory = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const toggleCategory = (value: string) => {
		if (selectedCategories.includes(value)) {
			setSelectedCategories(selectedCategories.filter((category) => category !== value));
		} else {
			setSelectedCategories([...selectedCategories, value]);
		}
	};

	const labelClassName = (value: string) =>
		`flex items-center justify-center px-4 py-2 transition duration-200 bg-white rounded-full cursor-pointer 
		${selectedCategories.includes(value) ? "border-solid border border-main text-main" : "border-solid border border-gray text-gray"}`;

	const textClassName = "text-sm font-semibold";

	return (
		<div
			id="category"
			className="z-10 flex flex-wrap gap-2 px-5 bg-transparent"
		>
			{categories.map((category) => (
				<label
					key={category}
					className={labelClassName(category)}
				>
					<input
						type="checkbox"
						name="category"
						value={category}
						className="hidden"
						onChange={() => toggleCategory(category)}
					/>
					<span className={textClassName}>{category}</span>
				</label>
			))}
		</div>
	);
};

export default UserCategory;
