import { IContainer } from "@interface/common";
import logo from "@assets/fooodding_user_logo.png";

const LoginContainer = ({ children }: IContainer) => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-around h-3/5 sm:h-2/5">
				<img
					src={logo}
					alt="logo"
					className="sm:w-80"
				/>
				{children}
			</div>
		</div>
	);
};

export default LoginContainer;
