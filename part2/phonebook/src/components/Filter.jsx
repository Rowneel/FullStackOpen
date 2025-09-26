function Filter({ filter, setFilter }) {
  return (
    <form>
      {" "}
      <div>
        Filter shown with:{" "}
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
    </form>
  );
}

export default Filter;
