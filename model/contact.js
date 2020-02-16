const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Contact name required"]
  },
  email: {
    type: String,
    required: [true, "Contact email required"],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  phone: {
    type: String,
    required: [true, "Contact phone number required"],
    trim: true
  }
});

const Contact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = Contact;
