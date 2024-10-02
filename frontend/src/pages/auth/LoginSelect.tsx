import { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoginContainer from "@components/common/LoginContainer";

const LoginSelect = () => {
	const { role } = useParams();
	const { naver } = window;

	const naverLogin = new naver.LoginWithNaverId({
		clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
		callbackUrl:
			role === "owners"
				? import.meta.env.VITE_NAVER_OWNER_CALLBACK_URL
				: import.meta.env.VITE_NAVER_USER_CALLBACK_URL,
		isPopup: false,
		loginButton: {
			color: "green",
			type: 3,
		},
	});

	useEffect(() => {
		naverLogin.init();
	}, []);

	return (
		<LoginContainer>
			<div className="mx-auto h-1/3">
				<div
					id="naverIdLogin"
					className="w-120 sm:w-64"
				/>
			</div>
		</LoginContainer>
	);
};

export default LoginSelect;
