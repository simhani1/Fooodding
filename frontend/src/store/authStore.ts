import { create } from "zustand";
import { IAuthAction, IAuthState } from "@interface/store";
import { Role } from "@interface/api";

const initialState: IAuthState = {
	isLoggined: false,
	role: Role.GUEST,
	nickname: "",
	accessToken: "",
};

const useAuthStore = create<IAuthState & IAuthAction>((set) => ({
	...initialState,
	updateIsLoggined: (isLoggined) => set(() => ({ isLoggined })),
	updateRole: (role) => set(() => ({ role })),
	updateNickname: (nickname) => set(() => ({ nickname })),
	updateAccessToken: (accessToken) => set(() => ({ accessToken })),
	reset: () => set(initialState),
}));

export default useAuthStore;
