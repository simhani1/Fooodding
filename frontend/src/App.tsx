import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("@pages/Login"));
const LoginSelect = lazy(() => import("@pages/auth/LoginSelect"));
const NaverLoginHandler = lazy(() => import("@pages/auth/NaverLoginHandler"));
const OwnerMain = lazy(() => import("@pages/owner/OwnerMain"));
const OwnerPage = lazy(() => import("@pages/owner/OwnerPage"));
const OwnerMap = lazy(() => import("@pages/owner/OwnerMap"));
const OwnerMenu = lazy(() => import("@pages/owner/OwnerMenu"));
const FoodTruckCreate = lazy(() => import("@pages/owner/FoodTruckCreate"));
const OwnerFoodTruck = lazy(() => import("@pages/owner/OwnerFoodTruck"));
const FoodTruckEdit = lazy(() => import("@pages/owner/FoodTruckEdit"));
const OwnerOpening = lazy(() => import("@pages/owner/OwnerOpening"));
const OwnerWaiting = lazy(() => import("@pages/owner/OwnerWaiting"));
const OwnerAnnouncement = lazy(() => import("@pages/owner/OwnerAnnouncement"));
const UserMap = lazy(() => import("@pages/user/UserMap"));
const UserFoodTruck = lazy(() => import("@pages/user/UserFoodTruck"));
const UserWaitingList = lazy(() => import("@pages/user/UserWaitingList"));
const Loading = lazy(() => import("@components/common/Loading"));

import { requestForToken, registerServiceWorker } from "firebase";
import { LoadingProvider, useLoading } from "@utils/LoadingContext";

import "./App.css";

function App() {
	const [token, setToken] = useState("");
	const { isLoading } = useLoading();

	useEffect(() => {
		const initializeFirebase = async () => {
			registerServiceWorker();

			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				const response = await requestForToken();
				if (response) {
					setToken(response);
					console.log(token);
				}
			}
		};

		initializeFirebase();
	}, []);

	return (
		<LoadingProvider>
			<Suspense fallback={<Loading />}>
				{isLoading && <Loading />} {/* 전역 로딩 상태에 따라 로딩 표시 */}
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
					<Route path="/owners">
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
							path="announcement"
							element={<OwnerAnnouncement />}
						/>
						<Route
							path="open"
							element={<OwnerOpening />}
						/>
						<Route
							path="close"
							element={<OwnerWaiting />}
						/>
					</Route>
					<Route path="/users">
						<Route
							path=""
							element={<UserMap />}
						/>
						<Route
							path="foodtruck"
							element={<UserFoodTruck />}
						/>
						<Route
							path="list"
							element={<UserWaitingList />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</LoadingProvider>
	);
}

export default App;
