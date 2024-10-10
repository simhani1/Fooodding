import TheSideBar from "@components/common/TheSideBar";

import { IContainer } from "@interface/common";

const Container = ({ children }: IContainer) => {
	return (
		<div className="flex h-screen">
			<TheSideBar />
			<div className="w-full ml-40">{children}</div>
		</div>
	);
};

export default Container;
