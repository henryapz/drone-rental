require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
const Order = require('../order/models/order.model');
const { signToken } = require('../../auth/auth.service');
const sendMail = require('../../utils/sengrid');

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json('All input are required');
    }

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
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json('All input are required');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line no-underscore-dangle
      const token = signToken({ user_id: user._id, email, role: user.role });
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
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function countUsers(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const ordersCompleted = await Order.countDocuments({ transactionStatus: 'Success' });
    const nonCompletedOrders = await Order.countDocuments({
      transactionStatus: 'Pending',
    });
    res.status(200).json({
      totalUsers,
      ordersCompleted,
      nonCompletedOrders,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function countTotalEarnings(req, res) {
  try {
    const totalEarnings = await Order.aggregate([
      { $match: { transactionStatus: 'Success' } },
      { $group: { _id: null, amount: { $sum: '$total' } } },
    ]);
    res.status(200).json({
      totalEarnings,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function countOrdersByMonths(req, res) {
  try {
    const totalEarningsByMonths = await Order.aggregate([
      { $match: { transactionStatus: 'Success' } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          amount: { $sum: '$total' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
    res.status(200).json({
      totalEarningsByMonths,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function listRecentDrones(req, res) {
  try {
    const transactionStatus = 'Success';
    const recentOrders = await Order.find({ transactionStatus })
      .limit(10)
      .sort({ createdAt: -1 })
      .select('userId transactionStatus createdAt total -_id')
      .populate({
        path: 'items',
        populate: [
          {
            path: 'droneId',
            model: 'Drone',
            select: {
              _id: 1,
              model: 1,
              brand: 1,
            },
          },
        ],
      });
    // droneId
    res.status(200).json({
      recentOrders,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword,
  countUsers,
  countTotalEarnings,
  countOrdersByMonths,
  listRecentDrones,
};
