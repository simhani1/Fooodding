import { IInputField } from "@interface/common";

const InputField = ({ label, type, placeholder, value, onChange, message }: IInputField) => {
	return (
		<div className="flex flex-col gap-3">
			<label className="text-3xl font-bold">{label}</label>
			<input
				className="w-full h-16 py-4 pl-5 text-xl border-2 rounded-md"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{message && <p className="text-xl text-red">{message}</p>}
		</div>
	);
};

export default InputField;
