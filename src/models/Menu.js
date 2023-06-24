const mongoose = require('mongoose')
const validator = require('validator')

const MenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu
