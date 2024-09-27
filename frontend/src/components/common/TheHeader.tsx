import Logo from "@assets/fooodding_user_logo.png";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const TheHeader = () => {
	const nav = useNavigate();

	return (
		<>
			<div className="flex flex-row justify-between px-6 py-6 bg-white shadow-sm">
				<CaretLeft
					size={24}
					onClick={() => nav(-1)}
				/>
				<img
					className="w-36"
					src={Logo}
					alt="logo"
					onClick={() => nav("/user")}
				/>
				<div style={{ width: 24 }}></div>
			</div>
		</>
	);
};

export default TheHeader;
