import { useEffect, useState } from "react";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import "./index.css";
import phonebookService from "./services/phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log("Printing persons", persons);

  useEffect(() => {
    console.log("effect");
    phonebookService
      .getAll()
      .then((initialPersons) => {
        console.log("promise fulfilled");
        setPersons(initialPersons);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err?.response?.data?.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, []);

  console.log("render", persons.length, "notes");

  function handleSubmit(e) {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const shouldReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (!shouldReplace) return;

      const updatedPerson = { name: newName, number: newPhone };
      phonebookService
        .update(existingPerson.id, updatedPerson)
        .then((returnedObject) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedObject.id ? person : returnedObject
            )
          );
          setSuccessMessage(
            `${returnedObject?.name} is updated with new number ${returnedObject?.number}`
          );
          setNewPhone("");
          setNewName("");
        })
        .catch((err) => {
          setError(err?.response?.data?.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
      return;
    }

    const newObject = { name: newName, number: newPhone };
    phonebookService
      .create(newObject)
      .then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setSuccessMessage(`Added ${returnedObject?.name}`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setNewName("");
        setNewPhone("");
      })
      .catch((err) => {
        setError(err?.response?.data?.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }

  function deletePhone(id) {
    const personToDelete = persons.find((person) => person.id === id);
    console.log("Logging personToDelete", personToDelete);
    const deleteConfirm = window.confirm(`Delete ${personToDelete?.name}?`);
    if (!deleteConfirm) return;

    phonebookService
      .del(id)
      .then((returnedObject) => {
        console.log("Printing returnedObject", returnedObject);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((err) => {
        console.log("Logging err", err);
        if (err?.status === 404) {
          setError(
            `Information of ${personToDelete?.name} is already removed from the server.`
          );
        } else {
          setError(err?.response?.data?.error);
        }
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }

  const filteredPersons = persons.filter((person) =>
    filter === ""
      ? true
      : person?.name.toLowerCase().includes(filter) ||
        person?.number.includes(filter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {error && <Notification error={true} message={error} />}
      {successMessage && <Notification message={successMessage} />}
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <div></div>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
        error={error}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onClick={deletePhone} />
    </div>
  );
};

export default App;
