require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const sendMail = require('../../utils/sengrid');

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
    sendMail('d-bebfea43ee5642dd8867390d0ea6256d', email, {});
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

      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.user.user_id;
    const user = await User.findById(userId);
    const {
      firstName, lastName, phone, address,
    } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.user_id;
    const user = await User.findById(userId);
    if (!(oldPassword && newPassword)) {
      res.status(400).json('All input are required');
    }
    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = newPassword;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json('Invalid current password');
    }
    // res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword,
};
