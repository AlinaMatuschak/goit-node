const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    if (err) console.log(err);
    console.table(JSON.parse(contacts));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    if (err) console.log(err);
    const contact = JSON.parse(contacts).find(con => con.id === contactId);
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    if (err) console.log(err);
    const newContacts = JSON.parse(contacts).filter(
      con => con.id !== contactId
    );
    fs.writeFile(contactsPath, newContacts, err => {
      if (err) console.log(err);
      console.table(newContacts);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    const curentContacts = JSON.parse(contacts);
    if (err) console.log(err);
    const newContacts = [
      ...curentContacts,
      {
        id: curentContacts.length + 1,
        name,
        email,
        phone
      }
    ];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
      if (err) console.log(err);
      console.table(newContacts);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
