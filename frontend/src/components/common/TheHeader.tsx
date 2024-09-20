import Logo from "@assets/fooodding_user_logo.png";
import { CaretLeft, Bell } from "@phosphor-icons/react";

const TheHeader = () => {
	return (
		<>
			<div className="flex flex-row justify-between px-6 py-6 bg-white shadow-sm">
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
