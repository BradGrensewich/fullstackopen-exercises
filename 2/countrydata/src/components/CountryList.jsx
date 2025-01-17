const CountryList = ({ countries, onCountrySelected }) => {
	return (
		<ul>
			{countries.map((country) => (
				<li key={country.ccn3}>
					{country.name.common}
					<button onClick={() => onCountrySelected(country.name.common)}>show</button>
				</li>
			))}
		</ul>
	);
};

export default CountryList;
