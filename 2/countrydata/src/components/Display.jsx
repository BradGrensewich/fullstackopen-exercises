import { useEffect, useState } from 'react';
import countryServices from '../services/countries';
import CountryList from './CountryList'
import CountryData from './CountryData'

const Display = ({ filter }) => {
	const [countries, setCountries] = useState([]);

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	);
	
	useEffect(() => {
		countryServices.getAll().then((countryList) => {
			setCountries(countryList);			
		});
	}, []);

    if (filteredCountries.length === 1) {         
        return (<CountryData country={filteredCountries[0]}/>)

    } else if (filteredCountries.length <= 10) {
        return (<CountryList countries={filteredCountries}/>)
    }
	return <div>Too many matches, specify a better filter</div>;
};

export default Display;
