const mongoose = require('mongoose');
const validator = require('validator');

const MenuSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    price: Number,
    category: { type: String, required: true },
    description: String
});

const MenuItem = mongoose.model('Menu', MenuSchema);

module.exports = MenuItem;
