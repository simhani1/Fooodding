import { IFormItem } from "@interface/foodTruck";

const FormItem = ({ label, children, isExtend }: IFormItem) => {
	return (
		<div className={`h-28 flex flex-col justify-between ${isExtend && "mb-10"}`}>
			<div className="flex flex-col">
				<label className="text-3xl mb-3">{label}</label>
				{children}
			</div>
		</div>
	);
};

export default FormItem;
