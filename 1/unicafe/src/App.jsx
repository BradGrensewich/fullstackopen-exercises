import { useState } from 'react';

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
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
			<h1>Statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
		</div>
	);
};

export default App;
