const User = require("../model/user");

module.exports = (req, res) => {
  const { email, password } = req.user;

  User.findOne({ email: email })
    .then(user => {
      if (user.password !== password)
        return res.status(401).json({ message: "Not authorized" });

      user.getJWT();
      res.status(200).json({ message: "Logout success" });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};
