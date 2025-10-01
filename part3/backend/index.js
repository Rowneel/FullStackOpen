import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { errorHandler } from "./middlewares.js/errorHandler.js";
import { tinyWithBody } from "./middlewares.js/morgan.js";
import { requestLogger } from "./middlewares.js/requestLogger.js";
import { unknownEndpoint } from "./middlewares.js/unknownEndpoint.js";
import PhoneBook from "./models/PhoneBook.js";
dotenv.config();
const app = express();
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
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

app.get("/api/persons", (req, res, next) => {
  PhoneBook.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  console.log("Logging body", body);

  // if (!body.name || !body.number) {
  //   return res.status(400).json({
  //     error: "Name or Number missing",
  //   });
  // }

  const newPerson = new PhoneBook({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.use("/info", (req, res, next) => {
  PhoneBook.find({})
    .then((persons) => {
      const date = new Date();
      const info = `<div><p>Phonebook has info for ${persons.length} people</p><p>${date}</p></div>`;
      res.send(info);
    })
    .catch((err) => {
      console.log("Logging err", err);
      next(err);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findById(id)
    .then((personInfo) => {
      if (!personInfo)
        return res.status(404).json({ error: "Person Not Found" });
      console.log("Logging personInfo", personInfo);
      res.status(200).json(personInfo);
    })
    .catch((err) => {
      console.log("Logging err", err);
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findByIdAndDelete(id)
    .then((result) => {
      if (!result) return res.status(404).json({ error: "Person Not Found" });
      console.log("Logging result", result);
      res.status(204).end();
    })
    .catch((err) => {
      console.log("Logging err", err);
      next(err);
    });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
