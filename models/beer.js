const mongoose = require('mongoose')

// Define our beer schema
const BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
})

module.exports = mongoose.model('Beer', BeerSchema)