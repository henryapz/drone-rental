const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

function config(app) {
  app.use(express.json({ limit: '50mb' }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

module.exports = config;
