const User = require('./user.model');

async function createUser(req, res) {
  const info = req.body;
  try {
    const user = await User.create(info);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  createUser,
};
