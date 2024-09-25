import { create } from "zustand";
import { IFoodTruckAction, IFoodTruckState } from "@interface/store";

const initialState: IFoodTruckState = {
	name: "",
	licenseNumber: "",
	introduction: "",
	category: "",
	isExist: false,
};

const useFoodTruckStore = create<IFoodTruckState & IFoodTruckAction>((set) => ({
	...initialState,
	updateName: (name) => set(() => ({ name })),
	updateLicenseNumber: (licenseNumber) => set(() => ({ licenseNumber })),
	updateIntroduction: (introduction) => set(() => ({ introduction })),
	updateCategory: (category) => set(() => ({ category })),
	updateIsExist: (isExist) => set(() => ({ isExist })),
	reset: () => set(initialState),
}));

export default useFoodTruckStore;
