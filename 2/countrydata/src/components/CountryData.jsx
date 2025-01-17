import { useEffect, useState } from 'react';
import countryServices from '../services/countries';

const CountryData = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const capital = country.capital[0];

	useEffect(() => {
		countryServices
			.getWeather(capital)
			.then((weatherData) => {
				setWeather(weatherData);
			})
			.catch((error) => {
				console.log(error);
				alert('error fetching weather data. probably api key issue');
			});
	}, []);

	if (weather === null) {
		return;
	}
	return (
		<>
			<h1>{country.name.common}</h1>
			<div>
				<p>capital {capital}</p>
				<p>area {country.area}</p>
			</div>
			<div>
				<h3>languages:</h3>
				<ul>
					{Object.values(country.languages).map((lang) => (
						<li key={lang}>{lang}</li>
					))}
				</ul>
			</div>
			<div>
				<img src={country.flags.svg} alt={country.flags.alt} />
			</div>
			<div>
				<h2>Weather in {country.capital[0]}</h2>
				<p>temperature: {weather.current.temp_c} Celcius</p>
				<p>
					air quality: {weather.current.air_quality['gb-defra-index']}{' '}
					/10{' '}
				</p>
			</div>
		</>
	);
};

export default CountryData;
