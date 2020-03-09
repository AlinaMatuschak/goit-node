const User = require("../model/user");

module.exports = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
      if (!user)
        return res.status(400).json({ message: "Неверный логин или пароль" });

      user.validatePassword(password).then(isValid => {
        if (isValid) user.getJWT();
        const userFields = user.getPublicFields();

        return isValid
          ? res.status(200).json(userFields)
          : res.status(400).json({ message: "Неверный логин или пароль" });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
