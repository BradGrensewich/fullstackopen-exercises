import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ onChange, searchFilter }) => {
	return (
		<div>
			filter shown with <input onChange={onChange} value={searchFilter} />
		</div>
	);
};

const NewPersonForm = ({
	onSubmit,
	name,
	number,
	onNameChange,
	onNumberChange,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input onChange={onNameChange} value={name} />
			</div>
			<div>
				number: <input onChange={onNumberChange} value={number} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

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
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchFilter, setSearchFilter] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

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

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleSearchChange = (event) => {
		setSearchFilter(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter onChange={handleSearchChange} searchFilter={searchFilter} />
			<h2>Numbers</h2>
			<NewPersonForm
				onSubmit={addPerson}
				name={newName}
				number={newNumber}
				onNameChange={handleNameChange}
				onNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<PersonList persons={persons} searchFilter={searchFilter} />
		</div>
	);
};

export default App;
