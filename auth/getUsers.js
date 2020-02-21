const User = require("../model/user");

module.exports = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => console.log(error));
};
