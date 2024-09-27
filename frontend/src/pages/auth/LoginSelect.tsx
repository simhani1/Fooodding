import { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoginContainer from "@components/common/LoginContainer";
import { ObjectType, PathType } from "@interface/common";

const LoginSelect = () => {
	const { role } = useParams() as PathType;
	const { naver } = window;

	const callbackUrl: ObjectType<string> = {
		owner: import.meta.env.VITE_NAVER_OWNER_CALLBACK_URL,
		user: import.meta.env.VITE_NAVER_USER_CALLBACK_URL,
	};

	const naverLogin = new naver.LoginWithNaverId({
		clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
		callbackUrl: callbackUrl[role],
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
