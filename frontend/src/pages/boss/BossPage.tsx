import Background from "@components/boss/Background";
import Button from "@components/common/Button";
import Title from "@components/common/Title";

const BossPage = () => {
	return (
		<Background>
			<>
				<Title title="내 정보" />
				<div className="my-10">
					<Button text={"푸드트럭 정보 관리"} />
					<Button text={"메뉴 관리"} />
					<Button text={"공고 알림 목록"} />
					<Button text={"소셜 계정"} />
				</div>
				<div className="flex justify-center items-center">
					<button className="text-gray text-xl">로그아웃</button>
					<span className="mx-4 text-xl">|</span>
					<button className="border-b-2 border-gray text-gray text-xl">회원탈퇴</button>
				</div>
			</>
		</Background>
	);
};

export default BossPage;
