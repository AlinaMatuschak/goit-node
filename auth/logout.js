const User = require("../model/user");

module.exports = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      user.validatePassword(password).then(isValid => {
        console.log(isValid);
        if (isValid) user.getJWT();

        return isValid
          ? res.status(200).json({ message: "Logout success" })
          : res.status(401).json({ message: "Not authorized" });
      });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};
