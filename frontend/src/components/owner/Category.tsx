import { ICategory } from "@interface/foodTruck";

const Category = ({ className, name, onClick }: ICategory) => {
	return (
		<button
			type="button"
			className={`min-w-28 h-20 border-2 border-black rounded-md p-4 text-3xl ${className}`}
			onClick={onClick}
		>
			{name}
		</button>
	);
};

export default Category;
