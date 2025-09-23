import { useState } from "react";

function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

function StatisticsLine({ title, value }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics({ good, neutral, bad }) {
  const sum = good + neutral + bad;

  const avg = sum === 0 ? 0 : (good - bad) / sum;

  const positive = sum === 0 ? 0 : (good / sum) * 100;

  if (!good && !neutral && !bad) {
    return <div>There is no stats to display</div>;
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <StatisticsLine title={"Good"} value={good} />
          <StatisticsLine title={"Neutral"} value={neutral} />
          <StatisticsLine title={"Bad"} value={bad} />
          <StatisticsLine title={"All"} value={sum} />
          <StatisticsLine title={"Average"} value={avg} />
          <StatisticsLine title={"Positive"} value={positive} />
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} label="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} label="Neutral" />
      <Button onClick={() => setBad(bad + 1)} label="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
