function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;

function Header({ course }) {
  console.log("Logging course", course);
  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

function Content({ parts }) {
  console.log("Logging parts", parts);
  return (
    <>
      {" "}
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
}

function Total({ parts }) {
  console.log("Logging parts", parts);
  return (
    <>
      {" "}
      <p>
        Number of exercises{" "}
        {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </>
  );
}

function Part({ part, exercises }) {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
}
