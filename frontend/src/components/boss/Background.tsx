import TheSideBar from "@components/common/TheSideBar";

interface Background {
	children: JSX.Element;
}

const Background = ({ children }: Background) => {
	return (
		<div className="flex">
			<TheSideBar />
			<div className="w-244 mt-20 ml-72">{children}</div>
		</div>
	);
};

export default Background;
