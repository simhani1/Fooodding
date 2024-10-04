const getWeekday = () => {
	const today = new Date();
	const options: Intl.DateTimeFormatOptions = { weekday: "long" };
	return today.toLocaleDateString("ko-KR", options);
};

export default getWeekday;
