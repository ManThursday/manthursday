"use strict";

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const Home = require('../../components/Home.js');
const pageTemplate = require('../templates/page');

const router = express.Router();

router.get('/', (req, res) => {
  const home = ReactDOMServer.renderToString(<Home/>);
  const page = pageTemplate({content: home});
  res.send(page);
});

module.exports = router;
