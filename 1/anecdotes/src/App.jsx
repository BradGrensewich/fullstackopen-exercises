import { useState } from 'react';

const Anecdote = ({ text, votes }) => {
	return (
		<div>
			{text} has {votes} votes
		</div>
	);
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];
	const count = anecdotes.length;

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(count).fill(0));

	const setNewNumber = () => {
		const rand = Math.floor(Math.random() * count);
		setSelected(rand);
	};

	const addVote = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	let most = 0;
	let index = 0;
	votes.forEach((tally, i) => {
		if (tally > most) {
			index = i;
			most = tally;
		}
	});
	const winner = index;

	return (
		<>
			<h1>Anecdote of the Day</h1>
			<Anecdote text={anecdotes[selected]} votes={votes[selected]} />
			<button onClick={addVote}>vote</button>
			<button onClick={setNewNumber}>next anecdote</button>
			<h1>Anecdote with the most votes</h1>
			<Anecdote text={anecdotes[winner]} votes={votes[winner]} />
		</>
	);
};

export default App;
