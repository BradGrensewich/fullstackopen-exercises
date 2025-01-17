import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
const weatherUrl = 'http://api.weatherapi.com/v1';
const weatherApi = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = () => {
	const request = axios.get(`${baseUrl}/all`);
	return request.then((res) => res.data);
};

const getWeather = (city) => {
	const request = axios.get(
		`${weatherUrl}/current.json?key=${weatherApi}&q=${city}&aqi=yes`
	);
	return request.then((res) => res.data);
};

export default { getAll, getWeather };
