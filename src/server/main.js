"use strict";

const express = require('express');
const home = require('./routes/home');

const app = express();

app.use('/static', express.static(__dirname + '/../client'));

app.use('/', home);

const server = app.listen(80, () => {
  const {address, port} = server.address();

  console.log('Example app listening at http://%s:%s', address, port);
});
