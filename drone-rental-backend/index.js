require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const expressConfig = require('./config/express');
const routes = require('./routes');

// Express server
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  connectDB();
  expressConfig(app);
  routes(app);
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
