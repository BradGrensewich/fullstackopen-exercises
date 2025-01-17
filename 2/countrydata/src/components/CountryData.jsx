const CountryData = ({ country }) => {
	return (
		<>
			<h1>{country.name.common}</h1>
			<div>
				<p>capital {country.capital[0]}</p>
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
		</>
	);
};

export default CountryData;
