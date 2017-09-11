'use strict'

const Common = require('../config/common');
const Config = require('../config/config');
const JWT = require('jsonwebtoken');
const User = require('../user/user.server.model').User;
const Product = require('../products/product.server.model').Product;
const Order = require('./orders.server.model').Order;
const privateKey = Config.key.privateKey;
const async = require('async');

exports.create = (req, res) => {
    Common.verifyToken(req, res, () => {
        Order.saveOrder(req.body, (err, order) => {
            if(!err) {
                return res.json(order);
            } else {
                if(err.name === 'ValidationError'){
                    return res.status(409).send(`there was an issue with the information provided`)
                } else {
                    return res.status(500).send(`Something went wrong.`)
                }
            }
        })
    })
};

exports.getOrder = (req, res) => {
    Common.verifyToken(req, res, user => {
        let query = {
            _id: req.params.id
        }
        if(user.userRole === 0){
            query.owner === user;
        }
        Order.findOrder(query, (err, order) => {
            if(!err){
                return res.json(order);
            } else {
                if(err.name === 'ValidationError'){
                    return res.status(409).send(`there was an issue with the information provided`)
                } else {
                    return res.status(500).send(`Something went wrong.`)
                }
            }
        })
    })
};

exports.getAllOrders = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Order.findAllOrders((err, orders) => {
            if(!err){
                return res.json(orders);
            } else {
                if(err.name === 'ValidationError'){
                    return res.status(409).send(`there was an issue with the information provided`)
                } else {
                    return res.status(500).send(`Something went wrong.`)
                }
            }
        })
    })
};

exports.getAllOrdersFrom = (req, res) => {
    Common.verifyToken(req, res, user => {
        let query = {
            owner:user._id
        }
        if(user.userRole === 1 || user.userRole === 2){
            query = {};
        }
        Order.findOrder(query, (err, orders) => {
            console.log(err, orders);
            if(!err){
                return res.json(orders);
            } else {
                if(err.name === 'ValidationError'){
                    return res.status(409).send(`there was an issue with the information provided`)
                } else {
                    return res.status(500).send(`Something went wrong.`)
                }
            }
        })
    })
}


exports.delete = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        console.log(req.params);
        Order.findOrder({_id: parseInt(req.params.id)}, (err, order) => {
            console.log(err)
            if(err) return res.status(500).send("There was an error with your request.");
            if(!order) return res.status(404).send("product not found");
            else {
                console.log(order);
                Product.removeProduct(order._id, (err, success) =>{
                    console.log(err,order);
                    if(err) return res.status(500).send("something went wrong");
                    else if(success) return res.json(order);
                })
            }
        })
    });
};

exports.update = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Order.findOrder({_id: req.body._id}, (err, order) => {
            if(err) return res.status(400).send("product not found");
            else if(order) {
                order.status = req.body.prod_name;
                Order.findProdcutUpdate({_id: order._id}, order, (err, orderUpd) => {
                    console.log(err, order);
                    if(err) return res.status(500).send("something went wrong");
                    else if(orderUpd) return res.json(order);
                })
            }
        })
    });
};
