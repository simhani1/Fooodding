import { useEffect, useState } from "react";

import WeatherItem from "@components/owner/WeatherItem";
import WeatherDetail from "@components/owner/WeatherDetail";

import { ILocation, IWeather, IWeatherList } from "@interface/owner";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const OwnerWeather = () => {
	const [currentWeather, setCurrentWeather] = useState<IWeather | null>(null);
	const [weatherList, setWeatherList] = useState<IWeatherList | null>(null);

	// 사용자 현재 위치를 가져오는 메서드
	useEffect(() => {
		const getUserLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let lat = position.coords.latitude;
					let lng = position.coords.longitude;
					getForecastByLocation({ lat, lng });
				});
			}
		};

		getUserLocation();
	}, []);

	// 날씨 예보 API 호출
	const getForecastByLocation = async ({ lat, lng }: ILocation) => {
		let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&cnt=8&units=metric&appid=${API_KEY}`;
		let response = await fetch(url);
		let data = await response.json();

		setWeatherList(data.list);
		setCurrentWeather(data.list[0]);
	};

	if (!weatherList) {
		return <div className="text-xl">날씨를 불러오는데 실패하였습니다.</div>;
	}

	return (
		<div className="flex h-48 gap-5">
			<div className="flex justify-between w-3/4 p-6 shadow-md rounded-2xl">
				{weatherList.map((item) => (
					<WeatherItem
						weather={item}
						key={item.dt}
					/>
				))}
			</div>
			<div className="flex justify-between w-1/4 px-6 py-3 shadow-md rounded-2xl">
				{currentWeather && <WeatherDetail weather={currentWeather} />}
			</div>
		</div>
	);
};

export default OwnerWeather;
