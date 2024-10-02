import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ownerLoginNaver, userLoginNaver } from "@api/auth-api";
import { ApiResponse, INaverLoginDTO, INaverLoginResponseDTO, Role, RoleParam } from "@interface/api";

const NaverLoginHandler = () => {
	const nav = useNavigate();
	const { role } = useParams();

	const handleLogin = async (
		loginFn: (dto: INaverLoginDTO) => ApiResponse<INaverLoginResponseDTO>,
		params: INaverLoginDTO,
		role: RoleParam,
	) => {
		try {
			const { data } = await loginFn(params);
			if (data.isSuccess) {
				const { accessToken } = data.data;
				localStorage.setItem("token", accessToken);
				nav(`/${role}`);
				return;
			}
			nav("/");
		} catch (error) {
			nav("/");
		}
	};

	useEffect(() => {
		const processNaverLogin = async () => {
			const queryParams = window.location.hash.substring(1).split("&");

			const params: INaverLoginDTO = {
				accessToken: "",
				role: role === "owners" ? Role.owners : Role.users,
			};

			queryParams.forEach((param) => {
				const [key, value] = param.split("=");
				if (key === "access_token") {
					params["accessToken"] = value;
				}
			});

			if (role === "owners") {
				handleLogin(ownerLoginNaver, params, "owners");
				return;
			}

			if (role === "users") {
				handleLogin(userLoginNaver, params, "users");
				return;
			}
		};

		processNaverLogin();
	}, []);

	return <></>;
};

export default NaverLoginHandler;
