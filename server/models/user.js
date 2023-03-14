const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: [true, 'Must provide a name'],
    trim: true,
  },
  name: {
    type: String,
    // required: [true, 'cannot be empty'],
    trim: true,
  },
  profileImg: {
    type: String,
    // required: [true, 'cannot be empty'],
    trim: true,
  },
})
// Instance of model is called a document
module.exports = mongoose.model('User', UserSchema)
