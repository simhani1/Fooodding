interface FormProps {
	label?: string;
	children: JSX.Element;
}

const FormItem = ({ label, children }: FormProps) => {
	return (
		<div className="h-28 flex flex-col justify-between mb-10">
			<label className="text-3xl mb-3">{label}</label>
			{children}
		</div>
	);
};

export default FormItem;
