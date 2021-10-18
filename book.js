const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
        default: "Unknown"
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        enum: ["Fantasy", "Sci-Fi", "Thriller", "Fiction", "NonFiction"]
    }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;