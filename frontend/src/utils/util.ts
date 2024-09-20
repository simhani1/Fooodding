export const allElementsHaveValues = (...elements: Array<string | number>) => {
	for (let val of elements) {
		if (!val) {
			return false;
		}
	}
	return true;
};

export const allPropertiesNotHaveValues = (obj: object) => {
	for (let val of Object.values(obj)) {
		if (val) {
			return false;
		}
	}
	return true;
};
