const User = require("../model/user");

module.exports = (req, res) => {
  try {
    const body = req.body;
    User.findOne({ email: body.email }).then(user => {
      if (!user)
        return res.status(400).json({ message: "Неверный логин или пароль" });

      const passwordComparre = user.validatePassword(body.password);
      if (passwordComparre) user.getJWT();
      const userFields = user.getPublicFields();

      passwordComparre
        ? res.status(200).json(userFields)
        : res.status(400).json({ message: "Неверный логин или пароль" });
    });
  } catch (error) {
    console.log(error);
  }
};
