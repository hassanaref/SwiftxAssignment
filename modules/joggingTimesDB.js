const mongoose = require('mongoose')

const joggingSchema = new mongoose.Schema({
  date: Date,
  distance: Number,
  time: Number,
  userId: String
})

module.exports = mongoose.model('joggingTime', joggingSchema)
