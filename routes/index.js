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
    let price = req.query.price;

    // create object to save schema properties to filter
    const filter = {};

    if (tags) {
      filter.tags = tags;
    }

    if (sell) {
      filter.sell = sell;
    }

    if (price) {
      filter.price = filterPrice(price);
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


// function to format price
function filterPrice(price) {
  if (price.includes('-')) {
    price = price.split('-');
    let maxPrice = price[0] !== '' ? parseInt(price[0]) : '';
    let minPrice = price[1] !== '' ? parseInt(price[1]) : '';

    if (maxPrice !== '' && minPrice !== '') {
      return {
        '$gte': maxPrice,
        '$lte': minPrice
      }
    } else if (maxPrice !== '') {
      return {
        '$gte': maxPrice
      }
    } else {
      return {
        '$lte': minPrice
      }
    }
  } else {
    return parseInt(price);
  }
}


module.exports = router;
