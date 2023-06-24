const mongoose = require('mongoose')
const validator = require('validator')

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  restaurant: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Restaurant',
  },
  order: Array,
  amountToPay: Number,
  
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
