const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    uniqueValidator = require('mongoose-unique-validator');

autoIncrement.initialize(db);

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userRole: {
        type: Number,
        default: 0
    },
    billingAddress: {
        type: String
    },
    shippingAddress: {
        type: String
    }
});

User.plugin(autoIncrement.plugin, {
    model: 'user',
    field: '_id'
});
User.plugin(uniqueValidator);

User.statics = {
    saveUser: function (requestData, callback) {
        this.create(requestData, callback);
    },
    findUserUpdate: function (query, user, callback) {
        this.findOneAndUpdate(query, user, callback);
    },
    updateUser: function (user, callback) {
        user.markModified('Object');
        user.save(callback);
    },
    findUser: function (query, callback) {
        this.findOne(query, callback);
    },
    findUserByUserName: function (id, username, callback) {
        this.findOne({ username: username, _id: id}, callback);
    },
    removeUser: function (query, callback) {
      this.findOneAndRemove(query, callback);
    },
    findAllUsers: function (callback) {
        this.find({}, callback);
    }
}

let user = mongoose.model('user', User);

module.exports = {
    User: user
};