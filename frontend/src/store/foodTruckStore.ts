import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IFoodTruckAction, IFoodTruckState } from "@interface/store";

const initialState: IFoodTruckState = {
	name: "",
	licenseNumber: "",
	introduction: "",
	category: "KOREAN",
	foodTruckId: 0,
};

const useFoodTruckStore = create(
	persist<IFoodTruckState & IFoodTruckAction>(
		(set) => ({
			...initialState,
			updateName: (name) => set(() => ({ name })),
			updateLicenseNumber: (licenseNumber) => set(() => ({ licenseNumber })),
			updateIntroduction: (introduction) => set(() => ({ introduction })),
			updateCategory: (category) => set(() => ({ category })),
			updateFoodTruckId: (foodTruckId) => set(() => ({ foodTruckId })),
			updateAll: (newState) => set(() => ({ ...newState })),
			reset: () => set(initialState),
		}),
		{
			name: "foodtruck",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useFoodTruckStore;
