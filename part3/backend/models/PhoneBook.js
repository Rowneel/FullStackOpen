import mongoose from "mongoose";

const PhoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Contact name is required"],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Contact number is required"],
  },
});

PhoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

export default mongoose.model("PhoneBook", PhoneBookSchema);
