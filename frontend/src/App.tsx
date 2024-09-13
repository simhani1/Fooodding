import { Route, Routes } from "react-router-dom";

import Login from "@pages/Login";
import OwnerMain from "@pages/owner/OwnerMain";
import OwnerPage from "@pages/owner/OwnerPage";
import OwnerFoodTruck from "@pages/owner/OwnerFoodTruck";
import UserMap from "@pages/user/UserMap";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Login />}
			/>
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
					path="foodtruck"
					element={<OwnerFoodTruck />}
				/>
			</Route>
			<Route
				path="/user"
				element={<UserMap />}
			/>
		</Routes>
	);
}

export default App;
