import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "@pages/Login";
import LoginSelect from "@pages/auth/LoginSelect";
import OwnerMain from "@pages/owner/OwnerMain";
import OwnerPage from "@pages/owner/OwnerPage";
import OwnerMap from "@pages/owner/OwnerMap";
import OwnerMenu from "@pages/owner/OwnerMenu";
import FoodTruckCreate from "@pages/owner/FoodTruckCreate";
import OwnerFoodTruck from "@pages/owner/OwnerFoodTruck";
import FoodTruckEdit from "@pages/owner/FoodTruckEdit";
import UserMap from "@pages/user/UserMap";
import UserFoodTruck from "@pages/user/UserFoodTruck";
import UserWaiting from "@pages/user/UserWaiting";
import UserWaitingList from "@pages/user/UserWaitingList";
import NaverLoginHandler from "@pages/auth/NaverLoginHandler";
import OwnerOpening from "@pages/owner/OwnerOpening";

import "./App.css";

function App() {
	const nav = useNavigate();

	return (
		<>
			{/* <div className="flex gap-5 m-10">
				<button
					className="text-xl border-b border-black border-solid"
					onClick={() => nav("/")}
				>
					로그인
				</button>

				<button
					className="text-xl border-b border-black border-solid"
					onClick={() => nav("/owner/mypage")}
				>
					사장님 마이페이지
				</button>

				<button
					className="text-xl border-b border-black border-solid"
					onClick={() => nav("/owner/map")}
				>
					사장님 지도페이지
				</button>

				<button
					className="text-xl border-b border-black border-solid"
					onClick={() => nav("/user")}
				>
					유저 메인 페이지
				</button>
			</div> */}

			<Routes>
				<Route
					path="/"
					element={<Login />}
				/>
				<Route path="/auth">
					<Route path=":role">
						<Route
							path=""
							element={<LoginSelect />}
						/>
						<Route
							path="naver"
							element={<NaverLoginHandler />}
						/>
					</Route>
				</Route>
				<Route path="/owner">
					<Route
						path=""
						element={<OwnerMain />}
					/>
					<Route
						path="mypage"
						element={<OwnerPage />}
					/>
					<Route
						path="map"
						element={<OwnerMap />}
					/>
					<Route
						path="foodtruck"
						element={<OwnerFoodTruck />}
					/>
					<Route path="foodtruck">
						<Route
							path=""
							element={<OwnerFoodTruck />}
						/>
						<Route
							path="create"
							element={<FoodTruckCreate />}
						/>
						<Route
							path="edit"
							element={<FoodTruckEdit />}
						/>
						<Route
							path="menu"
							element={<OwnerMenu />}
						/>
					</Route>
					<Route
						path="open"
						element={<OwnerOpening />}
					/>
				</Route>
				<Route path="/user">
					<Route
						path=""
						element={<UserMap />}
					/>
					<Route
						path="foodtruck"
						element={<UserFoodTruck />}
					/>
					<Route
						path="waiting"
						element={<UserWaiting />}
					/>
					<Route
						path="list"
						element={<UserWaitingList />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
