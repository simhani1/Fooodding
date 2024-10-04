import { IWeatherProps } from "@interface/owner";

const WeatherDetail = ({ weather }: IWeatherProps) => {
	const humidity = weather.main.humidity;
	const windSpeed = Math.round(weather.wind.speed);
	const feelsLike = Math.round(weather.main.feels_like);

	return (
		<div className="flex flex-col justify-around w-full">
			<div className="flex w-full">
				<h4 className="w-2/3 my-auto text-xl">체감 온도</h4>
				<p
					id="feelsLike"
					className="text-2xl"
				>
					{feelsLike}°
				</p>
			</div>
			<div className="flex w-full">
				<h4 className="w-2/3 my-auto text-xl">습도</h4>
				<p
					id="humidity"
					className="text-2xl"
				>
					{humidity}%
				</p>
			</div>
			<div className="flex w-full">
				<h4 className="w-2/3 my-auto text-xl">풍속</h4>
				<p
					id="windSpeed"
					className="text-2xl"
				>
					{windSpeed}m/s
				</p>
			</div>
		</div>
	);
};

export default WeatherDetail;
