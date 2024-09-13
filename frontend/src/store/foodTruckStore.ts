import { create } from "zustand";
import { FoodTruckReq } from "@swagger/data-contracts";

interface Action {
	updateLicenseNumber: (licenseNumber: FoodTruckReq["licenseNumber"]) => void;
	updateName: (name: FoodTruckReq["name"]) => void;
	updateIntroduction: (introduction: FoodTruckReq["introduction"]) => void;
	updateCategory: (category: FoodTruckReq["category"]) => void;
}

const useFoodTruckStore = create<FoodTruckReq & Action>((set) => ({
	licenseNumber: "",
	name: "",
	introduction: "",
	category: "",

	updateLicenseNumber: (licenseNumber) => set(() => ({ licenseNumber })),
	updateName: (name) => set(() => ({ name })),
	updateIntroduction: (introduction) => set(() => ({ introduction })),
	updateCategory: (category) => set(() => ({ category })),
}));

export default useFoodTruckStore;
