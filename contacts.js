const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const getCurentContacts = () =>
  JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf-8" }));

function listContacts() {
  try {
    return getCurentContacts();
  } catch (error) {
    console.error(error);
  }
}

function getContactById(contactId) {
  try {
    return getCurentContacts().find(con => con.id === contactId);
  } catch (error) {
    console.error(error);
  }
}

function removeContact(contactId) {
  try {
    const curentContacts = getCurentContacts();
    const newContacts = curentContacts.filter(con => con.id !== contactId);

    if (newContacts.length === curentContacts.length) return;

    fs.writeFileSync(contactsPath, JSON.stringify(newContacts));
    return true;
  } catch (error) {
    console.error(error);
  }
}

function addContact(newContact) {
  try {
    const newContacts = [...getCurentContacts(), newContact];
    fs.writeFileSync(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    console.error(error);
  }
}

function updateContact(contactId, body) {
  try {
    const curentContacts = getCurentContacts();

    if (!getContactById(contactId)) return null;

    const newContacts = curentContacts.map(contact => {
      if (contact.id !== contactId) return contact;
      return { ...contact, ...body };
    });

    fs.writeFileSync(contactsPath, JSON.stringify(newContacts));
    return getContactById(contactId);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
