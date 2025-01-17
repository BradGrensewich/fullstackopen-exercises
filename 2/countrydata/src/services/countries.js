import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
	const request = axios.get(`${baseUrl}/all`);
	return request.then((res) => res.data);
};

export default { getAll };
