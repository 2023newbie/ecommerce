const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cart: [
    { 
      productId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Product', 
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)
