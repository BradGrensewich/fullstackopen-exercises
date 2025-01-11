import { useState } from 'react';

const PersonItem = ({ person }) => {
	return (
		<li>
			{person.name} {person.number}
		</li>
	);
};

const PersonList = ({ persons, searchFilter }) => {
	const caseLessFilter = searchFilter.toLowerCase();
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(caseLessFilter)
	);
	return (
		<ul>
			{filteredPersons.map((person) => (
				<PersonItem key={person.id} person={person} />
			))}
		</ul>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchFilter, setSearchFilter] = useState('');

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.find((p) => p.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons(
			persons.concat({
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			})
		);
		setNewName('');
		setNewNumber('');
	};

	const updateNewName = (event) => {
		setNewName(event.target.value);
	};
	const updateNewNumber = (event) => {
		setNewNumber(event.target.value);
	};
	const updateSearchFilter = (event) => {
		setSearchFilter(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with{' '}
				<input onChange={updateSearchFilter} value={searchFilter} />
			</div>
			<h2>Numbers</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={updateNewName} value={newName} />
				</div>
				<div>
					number:{' '}
					<input onChange={updateNewNumber} value={newNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<PersonList persons={persons} searchFilter={searchFilter} />
		</div>
	);
};

export default App;
