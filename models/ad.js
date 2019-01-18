const mongoose = require('mongoose');

// define ad schema
const adSchema = new mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    picture: String,
    tags: [String]
});

// define ad model
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;