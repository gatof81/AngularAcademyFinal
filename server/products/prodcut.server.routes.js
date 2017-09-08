'use strict'

const Product = require('./product.server.controller');

module.exports = function (app) {
    app.post('/api/products', Product.create);
    app.delete('/api/deleteProduct/:id', Product.delete);
    app.put('/api/updateProduct', Product.update);
    app.get('/api/newPassword', Product.getById);
    app.get('/api/getAllProducts', Product.getAll);
}