import { useState } from "react";

import TheHeader from "@components/common/TheHeader";
import { userInputInfo } from "@api/auth-api";
import { useNavigate } from "react-router-dom";

const UserInputInfo = () => {
	const nav = useNavigate();

	const [gender, setGender] = useState<string>("");
	const [ageGroup, setAgeGroup] = useState<string>("");

	const handleGenderChange = (value: string) => {
		setGender(value);
	};

	const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAgeGroup(e.target.value);
	};

	//정보입력
	const inputInfo = () => {
		if (checkInfo()) {
			addUserInfo();
		}
	};

	const addUserInfo = async () => {
		try {
			const request = {
				gender: gender,
				ages: ageGroup,
			};

			await userInputInfo(request);
			nav("/users");
		} catch (err) {
			console.error(err);
		}
	};

	//유효성
	const checkInfo = () => {
		return gender !== "" && ageGroup !== "";
	};

	return (
		<>
			<TheHeader />

			<div className="flex flex-col items-center p-8">
				<h1 className="p-4 text-xl font-extrabold">성별과 연령대를 입력해주세요!</h1>
				<p className="mb-2 text-sm text-gray">성별과 연령대는 데이터 분석용으로만 사용됩니다.</p>

				<div className="px-10 py-20 m-8 border-2 border-solid rounded-xl border-user">
					<div className="m-8">
						<p className="mb-4 text-xl font-bold text-center">내 성별은?</p>

						<div className="flex justify-center space-x-4">
							<p
								className={`cursor-pointer px-4 py-2 border-solid border-2 rounded-lg ${
									gender === "M" ? "border-user" : "border-gray"
								}`}
								onClick={() => handleGenderChange("M")}
							>
								남자
							</p>
							<p
								className={`cursor-pointer px-4 py-2 border-solid border-2 rounded-lg ${
									gender === "F" ? "border-user" : "border-gray"
								}`}
								onClick={() => handleGenderChange("F")}
							>
								여자
							</p>
						</div>
					</div>

					<div className="flex items-center justify-center mb-4">
						<label className="mr-2">연령대:</label>
						<select
							value={ageGroup}
							onChange={handleAgeGroupChange}
							className="p-2 border rounded-md"
						>
							<option value="">선택하세요</option>
							<option value="10-19">10대</option>
							<option value="20-29">20대</option>
							<option value="30-39">30대</option>
							<option value="40-49">40대</option>
							<option value="50-59">50대</option>
							<option value="60-69">60대</option>
							<option value="70-79">70대</option>
						</select>
					</div>
				</div>

				<button
					className={`px-5 py-3 m-8 text-lg font-bold text-white rounded ${
						checkInfo() ? "bg-gradient-to-r from-main to-user" : "bg-gradient-to-r from-gray to-gray-light"
					}`}
					onClick={inputInfo}
					disabled={!checkInfo()}
				>
					입력했습니다
				</button>
			</div>
		</>
	);
};

export default UserInputInfo;
