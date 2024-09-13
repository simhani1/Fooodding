import { IInput } from "@interface/foodTruck";

const FormInput = ({ type, value, placeholder, disabled, message, onChange, onBlur }: IInput) => {
	return (
		<div className="flex flex-col gap-3">
			<input
				className="w-full h-20 border-2 rounded-md pl-5 py-4 text-3xl"
				type={type}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{message && <p className="text-red text-2xl">{message}</p>}
		</div>
	);
};

export default FormInput;
