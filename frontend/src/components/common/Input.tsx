import { useState } from "react";

interface InputProps {
	value?: string;
	placeholder?: string;
	isEditing: boolean;
}

const Input = ({ value, placeholder, isEditing }: InputProps) => {
	const [input, setInput] = useState<string>(value || "");

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	return (
		<input
			className="w-full h-20 border-2 rounded-md pl-5 py-4 text-3xl"
			type="text"
			placeholder={placeholder}
			value={input}
			onChange={onChange}
			disabled={isEditing ? false : true}
		/>
	);
};

export default Input;
