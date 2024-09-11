const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    publicationYear: {  
        type: Number
    },
    imageUrl: {  
        type: String
    },
    isbn: {  
        type: Number,
        unique: true
    },
    description: {
        type: String
    }
});

const BookModel = mongoose.model('Book', bookSchema);  

module.exports = BookModel;
