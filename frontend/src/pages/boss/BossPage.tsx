import { useNavigate } from "react-router-dom";

import Title from "@components/common/Title";
import Button from "@components/common/Button";
import Background from "@components/boss/Background";

const buttonClassName = "rounded-2xl shadow-md w-full h-28 mb-10 pl-10 text-4xl font-semibold box-border";
const basePath = "/boss";

const BossPage = () => {
	const nav = useNavigate();

	return (
		<Background>
			<>
				<Title title="내 정보" />
				<div className="my-10">
					<Button
						className={buttonClassName}
						onClick={() => nav(`${basePath}/foodtruck`)}
					>
						<h3 className="text-left">푸드트럭 정보 관리</h3>
					</Button>
					<Button
						className={buttonClassName}
						onClick={() => nav(`${basePath}/menu`)}
					>
						<h3 className="text-left">메뉴 관리</h3>
					</Button>
					<Button
						className={buttonClassName}
						onClick={() => {}}
					>
						<h3 className="text-left">공고 알림 목록</h3>
					</Button>
					<Button
						className={buttonClassName}
						onClick={() => {}}
					>
						<h3 className="text-left">소셜 계정</h3>
					</Button>
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
