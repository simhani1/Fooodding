import React, { createContext, useContext, useState } from "react";

import Loading from "@components/common/Loading";

interface LoadingContextProps {
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
			{/* isLoading이 true이면 Loading 컴포넌트 렌더링 */}
			{isLoading && <Loading />}
			{children}
		</LoadingContext.Provider>
	);
};
export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
};
