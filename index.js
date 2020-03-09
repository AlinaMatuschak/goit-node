const express = require("express");
const app = express();
const logger = require("morgan");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const { port, mode, secretJwtKey } = require("./config/config");
const userRouter = require("./auth/auth.router");
const dbConnection = require("./db/dbConenction");
dbConnection();

if (mode === "production") logger("dev");

app.use(express.json());

//GET /contacts
app.get("/contacts", (req, res) => {
  const { page = 1, limit = 5, sub } = req.query;

  const options = {
    page,
    limit
  };
  let query = { subscription: sub };
  if (!sub) query = {};

  User.paginate(query, options, function(err, result) {
    if (err) return res.status(500).json({ message: error.message });
    res.status(200).json(result.docs);
  });
});

// DELETE /users
app.delete("/users", (req, res) => {
  const headerToken = req.headers["authorization"];

  if (!headerToken)
    return res.status(422).json({ message: "Missing authorization field" });

  const token = headerToken.split("Bearer ")[1];
  const validToken = jwt.verify(token, secretJwtKey);
  if (!validToken) return res.status(401).json({ message: "Not authorized" });

  User.findOneAndDelete({
    token
  })
    .then(user => {
      if (!user) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "contact deleted" });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

//PATCH /users
app.patch("/usres", (req, res) => {
  const headerToken = req.headers["authorization"];
  const body = req.body;

  if (!headerToken || !Object.keys(body))
    return res.status(422).json({ message: "Missing fields: token or body" });

  const token = headerToken.split("Bearer ")[1];
  const validToken = jwt.verify(token, secretJwtKey);
  if (!validToken) return res.status(401).json({ message: "Not authorized" });

  User.findOneAndUpdate({ token }, { $set: body }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) res.status(404).json({ message: "Not found" });

      res.status(200).json(updatedUser);
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
