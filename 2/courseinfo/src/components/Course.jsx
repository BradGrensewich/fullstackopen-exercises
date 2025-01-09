const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
	return (
		<ul>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</ul>
	);
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

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;
