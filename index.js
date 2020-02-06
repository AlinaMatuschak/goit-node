const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const shortid = require("shortid");
const port = 3000;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("./contacts");

app.use(cors("*"));
logger("dev");
app.use(express.json());

//GET /api/contacts
app.get("/api/contacts", (req, res) => {
  try {
    const contacts = listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
  }
});

//GET /api/contacts/:contactId
app.get("/api/contacts/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  const contact = getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(contact);
});

// POST /api/contacts
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const newContact = {
    id: shortid(),
    name,
    email,
    phone
  };
  addContact(newContact);
  res.status(201).json(newContact);
});

// DELETE /api/contacts/:contactId
app.delete("/api/contacts/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  const isDeleted = removeContact(contactId);
  isDeleted
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

// PATCH /api/contacts/:contactId
app.patch("/api/contacts/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  if (!Object.keys(body)) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = updateContact(contactId, body);
  updatedContact === null
    ? res.status(404).json({ message: "Not found" })
    : res.status(200).json(updatedContact);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
