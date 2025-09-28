import express from "express";
import morgan from "morgan";
import { tinyWithBody } from "./middlewares.js/morgan.js";
import { requestLogger } from "./middlewares.js/requestLogger.js";
import { generateId } from "./utils/generateId.js";
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(morgan(tinyWithBody));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log("Logging body", body);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or Number missing",
    });
  }

  const newPerson = {
    ...body,
    id: generateId(persons),
  };

  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});

app.use("/info", (req, res) => {
  const date = new Date();
  const info = `<div><p>Phonebook has info for ${persons.length} people</p><p>${date}</p></div>`;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personInfo = persons.find((p) => p.id === id);
  if (!personInfo) return res.status(404).json({ error: "Person Not Found" });
  res.status(200).json(personInfo);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personToDelete = persons.find((p) => p.id === id);
  if (!personToDelete)
    return res.status(404).json({ error: "Person Not Found" });
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
