import { ITextField } from "@interface/common";

const TextField = ({ label, value }: ITextField) => {
	return (
		<div className="flex flex-col gap-5">
			<h4 className="text-4xl font-bold">{label}</h4>
			<span className="text-3xl text-gray font-bold">{value}</span>
		</div>
	);
};

export default TextField;
