import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '1234567890' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.find((p) => p.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons(persons.concat({ name: newName, number: newNumber }));
		setNewName('');
		setNewNumber('');
	};

	const updateNewName = (event) => {
		setNewName(event.target.value);
	};
	const updateNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
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
			<ul>
				{persons.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
