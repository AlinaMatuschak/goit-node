const jwt = require("jsonwebtoken");
const { secretJwtKey } = require("../config/config");
const User = require("../model/user");

module.exports = (req, res) => {
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
};
