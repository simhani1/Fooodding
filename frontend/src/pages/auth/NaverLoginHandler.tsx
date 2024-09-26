import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loginNaver } from "@api/auth-api";
import { INaverLoginDTO, Role } from "@interface/api";
import { ObjectType, PathType } from "@interface/common";
import useAuthStore from "@store/authStore";

const NaverLoginHandler = () => {
	const nav = useNavigate();
	const { role } = useParams() as PathType;

	const roleMap: ObjectType<Role> = {
		owner: Role.OWNER,
		user: Role.USER,
	};

	useEffect(() => {
		const processNaverLogin = async () => {
			const queryParams = window.location.hash.substring(1).split("&");

			const params: INaverLoginDTO = {
				accessToken: "",
				role: roleMap[role],
			};

			queryParams.forEach((param) => {
				const [key, value] = param.split("=");
				if (key === "access_token") {
					params["accessToken"] = value;
				}
			});

			try {
				console.log(params);
				const { data } = await loginNaver(params);
				if (data.isSuccess) {
					const { nickname, accessToken } = data.data;
					useAuthStore.setState({ accessToken, nickname, isLoggined: true, role: roleMap[role] });
					nav(`/${role}`);
				} else {
					nav("/");
				}
			} catch (error) {
				console.log(error);
				nav("/");
			}
		};

		processNaverLogin();
	}, []);

	return <></>;
};

export default NaverLoginHandler;
