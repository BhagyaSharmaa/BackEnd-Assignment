const BookModel = require('../Models/book');

async function getAllBooks(req, res) {
    const { genre, author, publication } = req.query;
    const filterCriteria = {};

    if (genre) filterCriteria.genre = genre;
    if (author) filterCriteria.author = author;
    if (publication) filterCriteria.publication = Number(publication);

    try {
        const booksList = await BookModel.find(filterCriteria);
        res.json(booksList);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error retrieving books' });
    }
}

async function addNewBook(req, res) {
    try {
        const { title, author, genre, publication, image_url, ISBN, description } = req.body;

        if (!title || !author) {
            return res.status(400).json({ success: false, message: 'Title, Author, and ISBN are required fields' });
        }

        const newBookEntry = new BookModel({
            title,
            author,
            genre: genre || '',
            publication: publication || null, 
            image_url: image_url || '', 
            ISBN: ISBN || null,
            description: description || '',
        });

        await newBookEntry.save();

        res.status(201).json({ success: true, message: 'Book added successfully', book: newBookEntry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding the book' });
    }
}

async function getBookById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Valid ID is required' });
    }

    try {
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({ success: true, book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error retrieving the book', error: err.message });
    }
}

async function updateBookById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Valid ID is required' });
    }

    const { title, author, genre, publication, image_url, ISBN, description } = req.body;

    try {
        const bookToUpdate = await BookModel.findById(id);
        if (!bookToUpdate) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        bookToUpdate.title = title || bookToUpdate.title;
        bookToUpdate.author = author || bookToUpdate.author;
        bookToUpdate.genre = genre || bookToUpdate.genre;
        bookToUpdate.publication = publication || bookToUpdate.publication;
        bookToUpdate.image_url = image_url || bookToUpdate.image_url;
        bookToUpdate.ISBN = ISBN || bookToUpdate.ISBN;
        bookToUpdate.description = description || bookToUpdate.description;

        await bookToUpdate.save();
        res.json({ success: true, message: 'Book updated successfully', book: bookToUpdate });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating the book' });
    }
}

async function deleteBookById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Valid ID is required' });
    }

    try {
        const removedBook = await BookModel.findByIdAndDelete(id);
        if (!removedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({ success: true, message: 'Book deleted successfully', book: removedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error deleting the book' });
    }
}

module.exports = {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBookById,
    deleteBookById
};
