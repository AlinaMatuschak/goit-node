const User = require("../model/user");

module.exports = (req, res) => {
  try {
    const { page = 1, limit = 5, sub } = req.query;
    const options = {
      page,
      limit
    };
    let query = { subscription: sub };
    if (!sub) query = {};

    User.paginate(query, options, function(err, result) {
      if (err) return res.status(500).json({ message: error.message });
      res.status(200).json(result.docs);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
