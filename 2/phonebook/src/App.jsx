import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Notification from './components/Notification';
import NewPersonForm from './components/NewPersonForm';
import PersonList from './components/PersonList';
import Filter from './components/Filter';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchFilter, setSearchFilter] = useState('');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		personServices
			.getAll()
			.then((initialList) => {
				setPersons(
					initialList.concat({
						name: 'Fake person',
						number: '55555555',
						id: '12312412',
					})
				);
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
				handleNotification(`${returnedPerson.name} added!`);
			})
			.catch((error) => {
				console.log('adding to server failed', error);
				handleErrorMessage('Error adding to server');
			});

		setNewName('');
		setNewNumber('');
	};

	//TODO cannot update
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
				handleNotification(`${returnedPerson.name} updated!`);
			})
			.catch((error) => {
				console.log(`Error updating ${person.name}'s info`, error);
				handleErrorMessage(`Error updating ${person.name}'s info`);
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
					persons.filter((person) => person.id !== toDelete.id)
				);				
				handleNotification(`${toDelete.name} deleted!`);
			})
			.catch((error) => {
				console.log(`Could not delete ${id}`, error);
				handleErrorMessage('Error deleting person');
			});
	};

	const handleErrorMessage = (message) => {
		setNotification({ text: message, error: true });
		setTimeout(() => setNotification(null), 5000);
	};
	const handleNotification = (message) => {
		setNotification({ text: message, error: false });
		setTimeout(() => setNotification(null), 5000);
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
			<Notification notification={notification} />
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
