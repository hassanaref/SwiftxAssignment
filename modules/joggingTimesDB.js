const mongoose = require('mongoose')

const joggingSchema = new mongoose.Schema({
    date: String,
    distance: Number,
    time: Number
})

module.exports = mongoose.model('joggingTime',joggingSchema)