import TheSideBar from "@components/common/TheSideBar";

import { IContainer } from "@interface/common";

const Container = ({ children }: IContainer) => {
	return (
		<div className="flex h-screen">
			<TheSideBar />
			<div className="ml-48 w-full">{children}</div>
		</div>
	);
};

export default Container;
