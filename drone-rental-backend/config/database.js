require('dotenv').config();

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    // eslint-disable-next-line no-console
    console.log('Connected to DB');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB;
