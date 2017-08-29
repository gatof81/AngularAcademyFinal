const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    uniqueValidator = require('mongoose-unique-validator');

autoIncrement.initialize(db);

let Product = new Schema({
    prod_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0
    }
});

Product.plugin(autoIncrement.plugin, {
    model: 'product',
    field: '_id'
});
Product.plugin(uniqueValidator);

Product.statics = {
    saveProduct: function (requestData, callback) {
        this.create(requestData, callback);
    },
    findProdcutUpdate: function (query, product, callback) {
        this.findOneAndUpdate(query, product, callback);
    },
    updateProduct: function (product, callback) {
        product.markModified('Object');
        product.save(callback);
    },
    findProduct: function (query, callback) {
        this.findOne(query, callback);
    },
    findByPrductID: function (id, product, callback) {
        this.findOne({ prod_name: product, _id: id}, callback);
    },
    removeProduct: function (productid) {
        this.findOneAndRemove({_id: productid});
    },
    findAllProducts: function (callback) {
        this.find({}, callback);
    }
}

let product = mongoose.model('product', Product);

module.exports = {
    Product: product
};