import { Suspense, lazy, useCallback, useEffect, useState } from "react";
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
import UserInputInfo from "@pages/user/UserInputInfo";

import "./App.css";
import { firebaseConfig, onMessageListener, requestForToken } from "firebase";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { LoadingProvider, useLoading } from "@utils/LoadingContext";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log(messaging);

function App() {
	const { isLoading } = useLoading();
	const [notification, setNotification] = useState({ title: "", body: "" });

	const showNotification = useCallback((title: string, body: string) => {
		if ("Notification" in window && Notification.permission === "granted") {
			new Notification(title, {
				body: body,
				icon: "/pwa-512x512.png",
			});
		}
		setNotification({ title, body });
		console.log(notification);
	}, []);

	useEffect(() => {
		const messageListener = async () => {
			try {
				const payload = await onMessageListener();
				const title = payload.notification?.title || "새로운 알림";
				const body = payload.notification?.body || "알림 내용을 확인해주세요.";
				showNotification(title, body);
			} catch (error) {
				console.error("Error in message listener:", error);
			}
		};

		messageListener();

		const getFCMToken = async () => {
			try {
				const permission = await Notification.requestPermission();
				if (permission !== "granted") return;
				const newToken = await requestForToken();
				console.log(newToken);

				if (newToken) {
					sessionStorage.setItem("fcmToken", newToken);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getFCMToken();
	}, [notification]);

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
							path="info"
							element={<UserInputInfo />}
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
