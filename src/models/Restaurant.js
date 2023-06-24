const mongoose = require('mongoose')
const validator = require('validator')

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  category: String,
  contact: String,
  menuList: Array
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant
