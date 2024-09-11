const Button = ({ text }: { text: string }) => {
	return (
		<button className="rounded-2xl shadow-md w-full h-28 mb-10 pl-10 text-4xl font-semibold box-border">
			<h3 className="text-left">{text}</h3>
		</button>
	);
};

export default Button;
