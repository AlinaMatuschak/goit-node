const User = require("../model/user");

module.exports = (req, res, next) => {
  try {
    const body = req.body;
    const { password, email } = body;
    if (!password || !email)
      return res.status(422).json({ message: "Missing required fields" });

    User.findOne({ email: email }).then(async userRegisrered => {
      if (userRegisrered)
        return res.status(400).json({ message: "Email in use" });

      const user = new User(body);

      const isGenerated = await user.generateHash(next);

      if (isGenerated) return res.status(201).json(user.getPublicFields());

      user.deleteOne();
      res.status(400).json({ message: "Try again, please!!!" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
