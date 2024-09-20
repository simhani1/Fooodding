import { Route, Routes } from "react-router-dom";

import OwnerMain from "@pages/owner/OwnerMain";
import OwnerPage from "@pages/owner/OwnerPage";
import OwnerMenu from "@pages/owner/OwnerMenu";
import FoodTruckCreate from "@pages/owner/FoodTruckCreate";
import OwnerFoodTruck from "@pages/owner/OwnerFoodTruck";
import FoodTruckEdit from "@pages/owner/FoodTruckEdit";
import UserMap from "@pages/user/UserMap";

import "./App.css";
import Login from "@pages/Login";

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
			</Route>
			<Route
				path="/user"
				element={<UserMap />}
			/>
		</Routes>
	);
}

export default App;
