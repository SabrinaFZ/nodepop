'use strict';

const express = require('express');
const router = express.Router();

// Import Ad model
const Ad = require('./../models/ad');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/ads', async (req, res, next) => {
  try {
    let result = await Ad.find();
    res.locals.data = result;
    res.render('index');

  } catch (err) {
    console.log('Ups, an error', err);
    process.exit(1);;
  }
});
module.exports = router;
