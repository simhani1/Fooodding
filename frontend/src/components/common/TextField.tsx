import { ITextField } from "@interface/common";

const TextField = ({ label, value }: ITextField) => {
	return (
		<div className="flex flex-col gap-4">
			<h4 className="text-3xl font-bold">{label}</h4>
			<span className="text-xl font-bold text-gray">{value}</span>
		</div>
	);
};

export default TextField;
