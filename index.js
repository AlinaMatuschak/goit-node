const express = require("express");
const app = express();
const logger = require("morgan");
const port = 3000;
const userRouter = require("./auth/auth.router");
const dbConnection = require("./db/dbConenction");
dbConnection();

logger("dev");
app.use(express.json());

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

//GET /api/contacts
// app.get("/api/contacts", (req, res) => {
//   Contact.find()
//     .then(contacts => res.status(200).json(contacts))
//     .catch(error => console.log(error));
// });

//GET /api/contacts/:contactId
// app.get("/api/contacts/:contactId", (req, res) => {
//   const contactId = req.params.contactId;
//   Contact.findById(contactId)
//     .then(contact => {
//       if (!contact) {
//         res.status(404).json({ message: "Not found" });
//         return;
//       }

//       res.status(200).json(contact);
//     })
//     .catch(err => console.log(err));
// });

// POST /api/contacts
// app.post("/api/contacts", (req, res) => {
//   const { name, email, phone } = req.body;

//   const newContact = new Contact({ name, email, phone });

//   newContact
//     .save()
//     .then(result => res.status(201).json(result))
//     .catch(err => res.status(400).json(err.message));
// });

// DELETE /api/contacts/:contactId
// app.delete("/api/contacts/:contactId", (req, res) => {
//   const contactId = req.params.contactId;
//   Contact.findByIdAndDelete({ _id: contactId })
//     .then(contact => {
//       if (!contact) return res.status(404).json({ message: "Not found" });

//       res.status(200).json({ message: "contact deleted" });
//     })
//     .catch(err => console.log(err));
// });

// PATCH /api/contacts/:contactId
// app.patch("/api/contacts/:contactId", (req, res) => {
//   const contactId = req.params.contactId;
//   const body = req.body;

//   if (!Object.keys(body)) {
//     return res.status(400).json({ message: "missing fields" });
//   }

//   Contact.findByIdAndUpdate({ _id: contactId }, { $set: body }, { new: true })
//     .then(updatedContact => {
//       if (!updatedContact) res.status(404).json({ message: "Not found" });

//       res.status(200).json(updatedContact);
//     })
//     .catch(err => console.log(err));
// });
