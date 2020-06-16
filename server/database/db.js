const mongoose = require('mongoose');
const dbURI = require('../config/keys').mongo.dbURI;

// connect to db
module.exports = mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, err => {
    if (err) console.error(`Connection error! ${err}`)
    else console.log('Connected to MongoDB');
});