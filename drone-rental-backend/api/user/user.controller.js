require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');

async function createUser(req, res) {
  try {
    // Getting user input data
    const { email, password } = req.body;

    // Checking if all params were send
    if (!(email && password)) {
      res.status(400).json('All input are required');
    }

    // Checking if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).json('User Already Exist. Please Login');
    }
    const user = await User.create({ email, password });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function loginUser(req, res) {
  try {
    // Getting user input data
    const { email, password } = req.body;

    // Checking if all params were send
    if (!(email && password)) {
      res.status(400).json('All input are required');
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createUser,
  loginUser,
};
