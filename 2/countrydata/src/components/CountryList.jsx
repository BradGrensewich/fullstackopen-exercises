const CountryList = ({ countries }) => {
	return (
		<ul>
			{countries.map((country) => (
				<li key={country.ccn3}>{country.name.common}</li>
			))}
		</ul>
	);
};

export default CountryList;
