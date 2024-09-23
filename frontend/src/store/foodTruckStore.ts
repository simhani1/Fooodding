import { create } from "zustand";
import { FoodTruckReq } from "@swagger/data-contracts";

interface Action {
	updateName: (name: FoodTruckReq["name"]) => void;
	updateLicenseNumber: (licenseNumber: FoodTruckReq["licenseNumber"]) => void;
	updateIntroduction: (introduction: FoodTruckReq["introduction"]) => void;
	updateCategory: (category: FoodTruckReq["category"]) => void;
}

const useFoodTruckStore = create<FoodTruckReq & Action>((set) => ({
	name: "빵빵 붕어빵",
	licenseNumber: "1234567890",
	introduction: "",
	category: "카페/디저트",

	updateName: (name) => set(() => ({ name })),
	updateLicenseNumber: (licenseNumber) => set(() => ({ licenseNumber })),
	updateIntroduction: (introduction) => set(() => ({ introduction })),
	updateCategory: (category) => set(() => ({ category })),
}));

export default useFoodTruckStore;
