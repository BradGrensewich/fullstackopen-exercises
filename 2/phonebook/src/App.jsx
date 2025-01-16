import { useState, useEffect } from 'react';
import personServices from './services/persons';

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

const PersonItem = ({ person, onDelete }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={onDelete}>delete</button>
		</li>
	);
};

const PersonList = ({ persons, searchFilter, onDelete }) => {
	const caseLessFilter = searchFilter.toLowerCase();
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(caseLessFilter)
	);
	return (
		<ul>
			{filteredPersons.map((person) => (
				<PersonItem
					key={person.id}
					person={person}
					onDelete={() => onDelete(person.id)}
				/>
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
		personServices
			.getAll()
			.then((initialList) => {
				setPersons(initialList);
			})
			.catch((error) => {
				console.log('initial fetch failed', error);
			});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const person = persons.find((p) => p.name === newName);
		if (person) {
			updatePerson(person);
			return;
		}
		personServices
			.create({ name: newName, number: newNumber })
			.then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
			})
			.catch((error) => {
				console.log('adding to server failed', error);
			});

		setNewName('');
		setNewNumber('');
	};

	const updatePerson = (person) => {
		if (
			!confirm(
				`${person.name} is already in phonebook. Replace old number?`
			)
		) {
			return;
		}
		personServices
			.update(person.id, { ...person, number: newNumber })
			.then((returnedPerson) => {
				setPersons(
					persons.map((p) =>
						p.id === returnedPerson.id ? returnedPerson : p
					)
				);
			});
	};

	const handleDeletePerson = (id) => {
		const toDelete = persons.find((person) => person.id === id);
		if (!confirm(`Delete ${toDelete.name}?`)) {
			return;
		}
		personServices
			.remove(id)
			.then((returnedPerson) => {
				setPersons(
					persons.filter((person) => person.id !== returnedPerson.id)
				);
				console.log(`${returnedPerson.name} was deleted`);
			})
			.catch((error) => {
				console.log(`Could not delete ${id}`);
			});
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
			<PersonList
				persons={persons}
				searchFilter={searchFilter}
				onDelete={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
