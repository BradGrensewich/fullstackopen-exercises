import Filter from './components/Filter';
import Display from './components/Display';
import { useState} from 'react';

function App() {
	const [filter, setFilter] = useState('');

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const handleCountrySelected = (countryName) => {
		setFilter(countryName);
	};

	return (
		<>
			<Filter value={filter} onSearchChange={handleFilterChange} />
			<Display
				filter={filter}
				onCountrySelected={handleCountrySelected}
			/>
		</>
	);
}

export default App;
