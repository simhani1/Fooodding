import Logo from "@assets/fooodding_user_logo.png";
import { CaretLeft, Bell } from "@phosphor-icons/react";

const TheHeader = () => {
	return (
		<>
			<div className="bg-white flex flex-row justify-between mb-8 px-6 py-6 shadow-sm">
				<CaretLeft size={24} />
				<img
					className="w-36"
					src={Logo}
					alt="logo"
				/>
				<Bell size={24} />
			</div>
		</>
	);
};

export default TheHeader;
