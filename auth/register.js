const User = require("../model/user");

module.exports = (req, res) => {
  try {
    const body = req.body;
    if (!body.password || !body.email)
      return res.status(422).json({ message: "Missing required fields" });

    User.findOne({ email: body.email }).then(userRegisrered => {
      if (userRegisrered)
        return res.status(400).json({ message: "Email in use" });

      const user = new User(body);

      user
        .save()
        .then(res => {
          user.getJWT();
          return user.getPublicFields();
        })
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
