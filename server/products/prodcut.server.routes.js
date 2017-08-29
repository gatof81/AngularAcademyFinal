'use strict'

const Product = require('./product.server.controller');

module.exports = function (app) {
    app.post('/api/user', Product.create);
    app.delete('/api/login', Product.delete);
    app.put('/api/verifyLink', Product.update);
    app.get('/api/newPassword', Product.getById);
    app.get('/api/newPassword', Product.getAll);
}