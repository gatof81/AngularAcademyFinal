'use strict'

const Order = require('./orders.server.controller');

module.exports = function (app) {
    app.post('/api/order', Order.create);
    app.get('/api/getOrder', Order.getOrder);
    app.get('/api/getAllOrders', Order.getAllOrders);
    app.get('/api/getAllOrdersFrom/:token', Order.getAllOrdersFrom);
    app.delete('/api/deleteOrder/:id', Order.delete);
    app.put('/api/updateOrder', Order.update);
}