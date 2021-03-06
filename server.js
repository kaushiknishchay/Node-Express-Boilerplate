'use strict';

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(config.db, { useNewUrlParser: true });

const connection = mongoose.connection;

module.exports = {
  app,
  connection
};

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connection
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}
