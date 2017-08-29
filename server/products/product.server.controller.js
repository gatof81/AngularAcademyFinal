'use strict'

const Common = require('../config/common');
const Config = require('../config/config');
const JWT = require('jsonwebtoken');
const User = require('../user/user.server.model').User;
const Product = require('./product.server.model').Product;
const privateKey = Config.key.privateKey;
const async = require('async');

exports.create = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Prodcut.saveProduct(req.body, (err, product) => {
            if(!err){
                callback(null, product);
            } else {
                if(err.name === 'ValidationError'){
                    let error = {};
                    error.statusCode = 409;
                    error.message = `there was an issue with the information provided`
                    callback(error, null)
                } else {
                    let error = {};
                    error.statusCode = 500;
                    error.message = `Something went wrong.`
                    callback(error, null);
                }
            }
        })
    })
};

exports.delete = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Product.findProduct({_id: req.body.id}, (err, product) => {
            if(err) return res.status(400).send("product not found");
            else {
                Product.removeProduct(product._id, (err, success) =>{
                    if(err) return res.status(500).send("something went wrong");
                    else return res.send("success: " + success)
                })
            }
        })
    });
};

exports.update = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Product.findProduct({_id: req.body.id}, (err, product) => {
            if(err) return res.status(400).send("product not found");
            else {
                let prodData = {
                    prod_name: req.body.prod_name,
                    description: req.body.description,
                    images: req.body.images,
                    prod_name: req.body.prod_name
                }
                Product.updateProduct(prodData, (err, success) =>{
                    if(err) return res.status(500).send("something went wrong");
                    else return res.send("success: " + success)
                })
            }
        })
    });
};

exports.getById = (req, res) => {
    Product.findByPrductID(req.body.id, req.body.product_name, (err, product) => {
        if(err) return res.status(400).send("product not found");
        else{
            return res.send(product);
        }
    })
};
exports.getAll = (req, res) => {
    Product.findAllProducts((err, product) => {
        if(err) return res.status(400).send("no products");
        else{
            return res.send(product);
        }
    })
};