import { useState } from "react";

function BestAnecdote({ bestAnecdote }) {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>
        {bestAnecdote.anecdote}
        <br /> has {bestAnecdote.vote} votes
      </div>
    </>
  );
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const initialVotes = anecdotes.reduce((acc, _, index) => {
    acc[index] = 0;
    return acc;
  }, {});
  const [votes, setVotes] = useState(initialVotes);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleNextAnecdote = () => {
    const randNo = getRandomInt(0, anecdotes.length - 1);
    setSelected(randNo);
  };

  const giveVote = () => {
    const newVotes = { ...votes, [selected]: votes[selected] + 1 };
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...Object.values(votes));

  const bestIndex = Object.entries(votes).find(([key, value]) => {
    return value === maxVotes;
  })[0];
  const bestAnecdote = {
    anecdote: anecdotes[bestIndex],
    vote: votes[bestIndex],
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes.</div>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <button onClick={giveVote}>Vote</button>
      <BestAnecdote bestAnecdote={bestAnecdote} />
    </div>
  );
};

export default App;
