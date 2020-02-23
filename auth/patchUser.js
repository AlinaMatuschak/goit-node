const jwt = require("jsonwebtoken");
const { secretJwtKey } = require("../config/config");
const User = require("../model/user");

module.exports = (req, res) => {
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
};
