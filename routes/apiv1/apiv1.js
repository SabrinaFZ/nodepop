'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('./../../models/ad');

// Get all ads (without filter)
router.get('/', async(req, res, next) => {
    try{
        // set query params
        let tags = req.query.tags;
        let sort = req.query.sort;

        // create object to save schema properties to filter
        const filter = {};

        if(tags){
            filter.tags = tags;
        }

        // execute filterBy
        let result = await Ad.filterBy(filter, sort);

        console.log(result);

        // send back response
        res.json({
            success:true,
            result: result
        });

    }catch(err){
        console.log('Ups, an error', err);
        process.exit(1);
    } 
});


module.exports = router;