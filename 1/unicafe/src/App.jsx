import { useState } from 'react';

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, count }) => {
	return (
		<p>
			{text} {count}
		</p>
	);
};
//done already in previous step
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const avg = (good - bad) / all;
	const pos = ((good / all) * 100).toString() + '%';
	if (all === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<>
			<h1>Statistics</h1>
			<StatisticLine text={'good'} count={good} />
			<StatisticLine text={'neutral'} count={neutral} />
			<StatisticLine text={'bad'} count={bad} />
			<StatisticLine text={'all'} count={all} />
			<StatisticLine text={'average'} count={avg} />
			<StatisticLine text={'positive'} count={pos} />
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleSelection = (selection) => () => {
		if (selection === 'good') {
			setGood(good + 1);
		} else if (selection === 'bad') {
			setBad(bad + 1);
		} else {
			setNeutral(neutral + 1);
		}
	};

	return (
		<div>
			<h1>Give Feedback here</h1>
			<Button onClick={handleSelection('good')} text={'good'} />
			<Button onClick={handleSelection('neutral')} text={'neutral'} />
			<Button onClick={handleSelection('bad')} text={'bad'} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
