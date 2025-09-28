import Notification from "./Notification.jsx";

function PersonForm({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleSubmit,
  error,
}) {
  return (
    <form>
      <div>
        name:{" "}
        <input
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          onChange={(e) => setNewPhone(e.target.value)}
          value={newPhone}
        />
      </div>{" "}
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
