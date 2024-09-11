const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBookById,
    deleteBookById
} = require('../Controllers/bookController');
const authenticateUser = require('../Middlewares/authenticateUser');

router.route('/')
    .get(getAllBooks)
    .post(authenticateUser, addNewBook);

router.route('/:id')
    .get(authenticateUser, getBookById)
    .put(authenticateUser, updateBookById)
    .delete(authenticateUser, deleteBookById);

module.exports = router;
