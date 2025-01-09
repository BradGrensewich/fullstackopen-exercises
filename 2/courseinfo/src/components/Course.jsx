const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Part = ({ part }) => {
	return (
		<li>
			<p>
				{part.name} {part.exercises}
			</p>
		</li>
	);
};

const Content = ({ parts }) => {
	return (
		<ul>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<li>
				<Total parts={parts} />
			</li>
		</ul>
	);
};

const Total = ({parts}) => {	

	const total = parts.reduce((acc, curr) => {
		return acc + curr.exercises;
	}, 0);

	return <h4> Total of {total} exercises</h4>;
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;
