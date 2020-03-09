const jwt = require("jsonwebtoken");
const { secretJwtKey } = require("../config/config");
const User = require("../model/user");

module.exports = async (req, res, next) => {
  try {
    const headerToken = req.headers["authorization"];

    if (!headerToken)
      return res.status(422).json({ message: "Missing authorization field" });

    const token = headerToken.split("Bearer ")[1];
    const validToken = jwt.verify(token, secretJwtKey);
    if (!validToken) return res.status(401).json({ message: "Not authorized" });

    const user = await User.findById(validToken.id);
    if (!user) return res.status(401).json({ message: "Not authorized" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
