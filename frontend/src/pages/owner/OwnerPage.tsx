import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import NavButton from "@components/common/NavButton";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import { ownerLogout, ownerWithdraw } from "@api/auth-api";

const basePath = "/owners";

const OwnerPage = () => {
	const nav = useNavigate();

	//로그아웃
	const logOutOwner = async () => {
		try {
			await ownerLogout();
			localStorage.removeItem("token");
			nav("/");
		} catch (err) {
			console.error(err);
		}
	};

	const withdrawOwner = async () => {
		try {
			await ownerWithdraw();
			localStorage.removeItem("token");
			nav("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container>
			<Main>
				<>
					<Title title="내 정보" />
					<div className="flex flex-col gap-8">
						<NavButton
							buttonText="푸드트럭 정보 관리"
							onClick={() => nav(`${basePath}/foodtruck`)}
						/>
						<NavButton
							buttonText="메뉴 관리"
							onClick={() => nav(`${basePath}/foodtruck/menu`)}
						/>
						<NavButton
							buttonText="공고 알림 목록"
							onClick={() => nav(`${basePath}/announcement`)}
						/>
					</div>
					<div className="flex items-center justify-center mt-10">
						<button
							className="text-xl text-gray"
							onClick={logOutOwner}
						>
							로그아웃
						</button>
						<span className="mx-4 text-xl text-gray">|</span>
						<button
							className="text-xl text-gray"
							onClick={withdrawOwner}
						>
							회원탈퇴
						</button>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerPage;
