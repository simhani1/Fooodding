import { useEffect, useState } from "react";

import { ILocation, ITodayWeather } from "@interface/owner";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const OwnerWeather = () => {
	const [weather, setWeather] = useState<ITodayWeather | null>(null);

	// 사용자 현재 위치를 가져오는 메서드
	useEffect(() => {
		const getUserLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let lat = position.coords.latitude;
					let lng = position.coords.longitude;
					getWeatherByLocation({ lat, lng });
				});
			}
		};

		getUserLocation();
	}, []);

	// 날씨 호출 메서드
	const getWeatherByLocation = async ({ lat, lng }: ILocation) => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
		let response = await fetch(url);
		let data = await response.json();

		console.log(data);
		setWeather(data);
	};

	return (
		<>
			<div>
				{weather && (
					<div className="weather-item">
						<p>
							<strong>Time:</strong> {new Date(weather.dt * 1000).toLocaleString()} {/* timestamp 변환 */}
						</p>
						<p>
							<strong>Temperature:</strong> {weather.main.temp}°C
						</p>
						<p>
							<strong>Feels like:</strong> {weather.main.feels_like}°C
						</p>
						<p>
							<strong>Min Temperature:</strong> {weather.main.temp_min}°C
						</p>
						<p>
							<strong>Max Temperature:</strong> {weather.main.temp_max}°C
						</p>
						<p>
							<strong>Humidity:</strong> {weather.main.humidity}%
						</p>
						<p>
							<strong>Wind Speed:</strong> {weather.wind.speed} m/s
						</p>
						<p>
							<strong>Weather:</strong> {weather.weather[0].description}
						</p>
						<p>
							<strong>Cloudiness:</strong> {weather.clouds.all}%
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default OwnerWeather;
