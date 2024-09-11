const mongoose = require('mongoose');

async function connectToDatabase(connectionString) {
    return mongoose.connect(connectionString);
}

module.exports = connectToDatabase;
