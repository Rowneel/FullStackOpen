import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3] ?? null;
const number = process.argv[4] ?? null;

const url = `mongodb+srv://root:${password}@books-store-mern.wtcdmhf.mongodb.net/fullstackopen?retryWrites=true&w=majority&appName=Books-Store-MERN`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneBook = mongoose.model("PhoneBook", phonebookSchema);

if (!name || !number) {
  console.log("Logging reached");

  PhoneBook.find({})
    .then((result) => {
      console.log("PhoneBook: result",result);
      result.forEach((r) => console.log(r.name + " " + r.number));
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection.close();
    });
} else {
  const phoneBook = new PhoneBook({ name, number });
  phoneBook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
