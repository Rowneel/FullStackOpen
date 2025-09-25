import Content from "./Content.jsx";
import Header from "./Header.jsx";

function Course({ course }) {
  const total = course?.parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      <Header title={course?.name} />
      <Content parts={course?.parts} />
      <strong>total of {total} exercises</strong>
    </div>
  );
}

export default Course;
