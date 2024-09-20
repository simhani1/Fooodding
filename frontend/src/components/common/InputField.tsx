import { IInputField } from "@interface/common";

const InputField = ({ label, type, placeholder, value, onChange, message }: IInputField) => {
	return (
		<div className={`h-40 ${message && "mb-10"}`}>
			<div className="flex flex-col gap-3">
				<label className="text-3xl">{label}</label>
				<div className="flex flex-col gap-3">
					<input
						className="w-full h-20 border-2 rounded-md pl-5 py-4 text-3xl"
						type={type}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
					/>
					{message && <p className="text-red text-2xl">{message}</p>}
				</div>
			</div>
		</div>
	);
};

export default InputField;
