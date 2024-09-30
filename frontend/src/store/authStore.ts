import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IAuthAction, IAuthState } from "@interface/store";
import { Role } from "@interface/api";

export const initialState: IAuthState = {
	isLoggined: false,
	role: Role.GUEST,
	nickname: "",
	accessToken: "",
};

const useAuthStore = create(
	persist<IAuthState & IAuthAction>(
		(set) => ({
			...initialState,
			updateIsLoggined: (isLoggined) => set(() => ({ isLoggined })),
			updateRole: (role) => set(() => ({ role })),
			updateNickname: (nickname) => set(() => ({ nickname })),
			updateAccessToken: (accessToken) => set(() => ({ accessToken })),
			updateOnLogin: (newState) => set(() => ({ ...newState })),
			reset: () => set(initialState),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
