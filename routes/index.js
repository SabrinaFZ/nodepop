'use strict';

const express = require('express');
const router = express.Router();

// Import Ad model
const Ad = require('./../models/ad');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Get all ads (without filter)
router.get('/ads', async (req, res, next) => {
  try {
    // set query params
    let tags = req.query.tags;
    let sort = req.query.sort;
    let sell = req.query.sell;

    // create object to save schema properties to filter
    const filter = {};

    if (tags) {
      filter.tags = tags;
    }

    if (sell) {
      filter.sell = sell;
    }

    // execute filterBy
    let result = await Ad.filterBy(filter, sort);

    console.log(result);

    // send back response
    res.locals.data = result;
    res.render('index');

  } catch (err) {
    console.log('Ups, an error', err);
    process.exit(1);
  }
});
module.exports = router;
