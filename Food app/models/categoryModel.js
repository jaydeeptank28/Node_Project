const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Category is Required"]
    },

    imageUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    }
}, { timestamps: true })

const Category = mongoose.model("Category", categorySchema);
module.exports = Category