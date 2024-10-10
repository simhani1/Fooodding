// import { useNavigate } from "react-router-dom";

const UserOrder = () => {
	// const nav = useNavigate();

	return (
		<>
			<div className="flex flex-row m-4">
				<p className="text-2xl font-extrabold text-user">10분 이내</p>
				<p className="text-2xl font-extrabold text-black">에 와주세요!</p>
			</div>

			<p className="mb-4 font-medium text-black text-md">오지 않으면 자동 취소됩니다.</p>
		</>
	);
};

export default UserOrder;
