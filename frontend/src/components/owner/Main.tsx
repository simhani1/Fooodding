import { IContainer } from "@interface/common";

const Main = ({ children }: IContainer) => {
	return (
		<main className="h-full pt-16">
			<div className="flex flex-col w-5/6 gap-12 mx-auto">{children}</div>
		</main>
	);
};

export default Main;
