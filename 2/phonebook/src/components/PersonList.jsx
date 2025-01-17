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

export default PersonList