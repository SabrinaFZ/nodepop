'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('./../../models/ad');

// Get all ads (without filter)
router.get('/', async(req, res, next) => {
    try{
        let result = await Ad.find();
        res.json({
            success:true,
            result: result
        })

    }catch(err){
        console.log('Ups, an error', err);
        process.exit(1);;
    }
    
});

module.exports = router;