import { useNavigate } from "react-router-dom";

import LoginCard from "@components/common/LoginCard";
import LoginContainer from "@components/common/LoginContainer";

import { User, Users } from "@phosphor-icons/react";

const Login = () => {
	const nav = useNavigate();

	return (
		<LoginContainer>
			<div className="flex gap-10">
				<LoginCard
					title="사장님으로 로그인"
					onClick={() => nav("/auth/owner")}
				>
					<User
						size={120}
						color="#F27387"
						className="sm:w-16"
					/>
				</LoginCard>
				<LoginCard
					title="손님으로 로그인"
					onClick={() => nav("/auth/user")}
				>
					<Users
						size={120}
						color="#CF69A3"
						className="sm:w-16"
					/>
				</LoginCard>
			</div>
		</LoginContainer>
	);
};

export default Login;
