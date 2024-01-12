const mongoose = require('mongoose');

const Schema = mongoose.Schema

const sessionSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [
    {
      message: {
        type: String,
        required: true
      },
      role: {
        type: String, 
        required: true
      }
    }
  ]
})

module.exports = mongoose.model('Session', sessionSchema)