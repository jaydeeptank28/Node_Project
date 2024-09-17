const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    Taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },

    isDrink: {
        type: Boolean,
        required: false
    },

    ingredients: {
        type: [String],
        default: []
    },

    numSales: {
        type: Number,
        default:0
    }

})


const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;