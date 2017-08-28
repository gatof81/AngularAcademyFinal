const Mongoose = require('mongoose');
const config = require('./config');

Mongoose.connect(config.database.url);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('connection with database succeeded.');
});

exports.db = db;