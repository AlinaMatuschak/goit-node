module.exports = (req, res) => {
  const { user } = req.user.getPublicFields();
  return res.status(200).json(user);
};
