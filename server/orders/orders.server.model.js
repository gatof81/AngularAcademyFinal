import {Product} from "../../client/src/app/models/product";
import {User} from "../../client/src/app/models/user";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    uniqueValidator = require('mongoose-unique-validator');

autoIncrement.initialize(db);

let Order = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    products: {
        type: Array<Product>,
        required: true,
        default:[]
    },
    owner: {
        type: User,
        required:true,
        default:{}
    }
});

Order.statics = {
    saveOrder: function (requestData, callback) {
        this.create(requestData, callback);
    },
    findOrderUpdate: function (query, product, callback) {
        this.findOneAndUpdate(query, product, callback);
    },
    findOrder: function (query, callback) {
        this.findOne(query, callback);
    },
    removeOrder: function (query, callback) {
        this.findOneAndRemove(query, callback);
    },
    findAllOrders: function (callback) {
        this.find({}, callback);
    }
}

Order.plugin(autoIncrement.plugin, {
    model: 'order',
    field: '_id'
});

Order.plugin(uniqueValidator);

let order = mongoose.model('order', Order);

module.exports = {
    Order: order
};