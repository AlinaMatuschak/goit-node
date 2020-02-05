const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
});

const Contact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = Contact;
