function Persons({ filteredPersons, onClick }) {
  return (
    <>
      {" "}
      {filteredPersons.map((person) => (
        <div key={person.name} className="note">
          {person.name}: {person.number}
          <button onClick={() => onClick(person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Persons;
