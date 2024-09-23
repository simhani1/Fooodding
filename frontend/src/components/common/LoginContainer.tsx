import { IContainer } from "@interface/common";
import logo from "@assets/fooodding_user_logo.png";

const LoginContainer = ({ children }: IContainer) => {
	return (
		<div className="h-screen flex justify-center items-center">
			<div className="h-3/5 flex flex-col justify-around">
				<img
					src={logo}
					alt="logo"
				/>
				{children}
			</div>
		</div>
	);
};

export default LoginContainer;
