import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";

import useAuthStore from "@store/authStore";
import naverLogo from "@assets/naver_square.png";

const SocialLogin = () => {
	const { nickname } = useAuthStore();
	return (
		<Container>
			<Main>
				<>
					<Title title="소셜 계정" />
					<button className="box-border w-full px-10 font-semibold shadow-md rounded-2xl h-28">
						<div className="flex flex-col justify-around h-2/3">
							<span className="text-2xl text-left">{nickname}</span>
							<div className="flex items-center gap-2">
								<img
									src={naverLogo}
									className="w-4"
								/>
								<span className="text-sm">네이버</span>
							</div>
						</div>
					</button>
				</>
			</Main>
		</Container>
	);
};

export default SocialLogin;
