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
        Product.saveProduct(req.body, (err, product) => {
            console.log(req.body)
            if(!err){
                return res.json(product);
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

exports.delete = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        console.log(req.params);
        Product.findProduct({_id: parseInt(req.params.id)}, (err, product) => {
            console.log(err)
            if(err) return res.status(500).send("There was an error with your request.");
            if(!product) return res.status(404).send("product not found");
            else {
                console.log(product);
                Product.removeProduct(product._id, (err, success) =>{
                    console.log(err,product);
                    if(err) return res.status(500).send("something went wrong");
                    else if(success) return res.json(product);
                })
            }
        })
    });
};

exports.update = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        Product.findProduct({_id: req.body._id}, (err, product) => {
            if(err) return res.status(400).send("product not found");
            else if(product) {
                product.prod_name = req.body.prod_name;
                product.description = req.body.description;
                product.price = req.body.price;
                Product.findProdcutUpdate({_id: product._id}, product, (err, productUpdated) => {
                    console.log(err, product);
                    if(err) return res.status(500).send("something went wrong");
                    else if(productUpdated) return res.json(product);
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