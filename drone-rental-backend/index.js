require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Express server
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
