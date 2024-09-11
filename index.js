const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 5050;

app.use(bodyParser.json());

// *** imports *** //
const connectToDatabase = require('./dbConnection');
const bookRoutes = require('./Routes/bookRoutes');
const authRoutes = require('./Routes/authRoutes');

// *** connecting to MongoDB *** //
connectToDatabase('mongodb://localhost:27017/Books_Management')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Error connecting to database');
    });

// *** routing endpoints *** //
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.log('Error starting server');
    } else {
        console.log(`Server running at port - ${PORT}`);
    }
});
