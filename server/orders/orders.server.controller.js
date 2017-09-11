'use strict'

const Common = require('../config/common');
const Config = require('../config/config');
const JWT = require('jsonwebtoken');
const User = require('../user/user.server.model').User;
const Product = require('./product.server.model').Product;
const Order = require('./product.server.model').Order;
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
            owner:user
        }
        Order.findOrder(query, (err, orders) => {
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

