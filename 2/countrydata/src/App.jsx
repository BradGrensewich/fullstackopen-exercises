import Filter from './components/Filter';
import Display from './components/Display';
import { useState, useEffect } from 'react';

function App() {
	const [filter, setFilter] = useState('');

	const handleFilterChange = (event) => {
		setFilter(event.target.value);		
	};

	return (
		<>
			<Filter value={filter} onSearchChange={handleFilterChange} />
			<Display filter={filter}/>
		</>
	);
}

export default App;
