const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  desc: {
    type: String,
    required: [true, 'cannot be empty'],
    trim: true,
  },
  dateAndTime: {
    type: String,
    required: [true, 'cannot be empty'],
    trim: true,
  },
  notifyBefore: {
    type: String,
    required: [true, 'cannot be empty'],
  },
  author: {
    type: String,
    required: [true, 'cannot be empty'],
  },
})
// Instance of model is called a document
module.exports = mongoose.model('Todo', todoSchema)
