const mongoose = require('mongoose')

//mongoDB storage
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  id: String,
  role: {
    type:String,
    default:"user"}
})

module.exports = mongoose.model('user', UserSchema)
