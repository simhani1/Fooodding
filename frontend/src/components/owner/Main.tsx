import { IContainer } from "@interface/common";

const Main = ({ children }: IContainer) => {
	return (
		<main className="h-full pt-20">
			<div className="w-5/6 mx-auto flex flex-col gap-12">{children}</div>
		</main>
	);
};

export default Main;
