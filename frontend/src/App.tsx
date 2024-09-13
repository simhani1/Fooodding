import { Route, Routes } from "react-router-dom";

import Login from "@pages/Login";
import OwnerMain from "@pages/owner/OwnerMain";
import OwnerPage from "@pages/owner/OwnerPage";
import UserMap from "@pages/user/UserMap";

import "./App.css";

function App() {
	return (
		<div id="App">
			<Routes>
				<Route
					path="/"
					element={<Login />}
				/>
				<Route
					path="/owner"
					element={<OwnerMain />}
				>
					<Route
						path="/mypage"
						element={<OwnerPage />}
					/>
				</Route>
				<Route
					path="/user"
					element={<UserMap />}
				/>
			</Routes>
		</div>
	);
}

export default App;
