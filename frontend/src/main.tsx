import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { LoadingProvider } from "@utils/LoadingContext.tsx";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<LoadingProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</LoadingProvider>,
);
