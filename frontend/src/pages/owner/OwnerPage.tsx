import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import NavButton from "@components/common/NavButton";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";

const basePath = "/owner";

const OwnerPage = () => {
	const nav = useNavigate();

	return (
		<Container>
			<Main>
				<>
					<Title title="내 정보" />
					<div className="flex flex-col gap-10">
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
							onClick={() => {}}
						/>
						<NavButton
							buttonText="소셜 계정"
							onClick={() => {}}
						/>
					</div>
					<div className="flex justify-center items-center mt-10">
						<button className="text-gray text-xl">로그아웃</button>
						<span className="mx-4 text-xl">|</span>
						<button className="border-b-2 border-gray text-gray text-xl">회원탈퇴</button>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerPage;
