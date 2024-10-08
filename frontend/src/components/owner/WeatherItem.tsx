import { IWeatherProps } from "@interface/owner";
import { Cloud, CloudLightning, CloudRain, CloudSnow, DropSimple, Sun } from "@phosphor-icons/react";

const WeatherItem = ({ weather }: IWeatherProps) => {
	const hour = new Date(weather.dt * 1000).getHours();
	const temperature = Math.round(weather.main.temp);
	const weatherDetail = weather.weather[0].main;
	const pop = Math.round(weather.pop);

	let weatherIcon = <></>;
	switch (weatherDetail) {
		case "Clear":
			weatherIcon = <Sun />;
			break;
		case "Clouds":
			weatherIcon = <Cloud />;
			break;
		case "Rain":
			weatherIcon = <CloudRain />;
			break;
		case "Thunderstorm":
			weatherIcon = <CloudLightning />;
			break;
		case "Snow":
			weatherIcon = <CloudSnow />;
			break;
	}

	return (
		<div className="flex flex-col justify-between h-full text-xl text-center">
			<p id="hour">{hour}시</p>
			<div className="mx-auto">{weatherIcon}</div>
			<p
				id="temperature"
				className="text-2xl"
			>
				{temperature}°
			</p>
			<p
				id="pop"
				className="flex gap-1"
			>
				<DropSimple className="my-auto" />
				{pop}%
			</p>
		</div>
	);
};

export default WeatherItem;
