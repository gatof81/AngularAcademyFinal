'use strict'

const Common = require('../config/common');
const Config = require('../config/config');
const JWT = require('jsonwebtoken');
const User = require('./user.server.model').User;
const privateKey = Config.key.privateKey;
const async = require('async');

exports.create = (req, res) => {
    req.body.password = Common.encrypt(req.body.password);
    req.body.userRole = 0;
    async.waterfall([
        function (callback) {
            User.saveUser(req.body, (err, user) => {
                if(!err){
                    callback(null, user);
                } else {
                    if(err.name === 'ValidationError'){
                        let error = {};
                        error.statusCode = 409;
                        error.message = `please provide another user Email`
                        callback(error, null)
                    } else {
                        let error = {};
                        error.statusCode = 500;
                        error.message = `Something went wrong.`
                        callback(error, null);
                    }
                }
            })
        },
        function (user, callback) {
            let tokenData = {
                username: user.username,
                id: user._id
            };
            Common.sentMailVerificationLink(user, JWT.sign(tokenData, privateKey), (error, result) => {
                if(!error) callback(error, null);
                else callback(null, 'done')
            })
        }
    ],
    function (err, results) {
        if(err){
            if(err.statusCode) return res.status(err.statusCode).send(err.message);
            else return res.status(500).send(`Something wen't wrong: ${err.message}`);
        } else {
            return res.json({message: `Please confirm your email id by clicking on link in email`});
        }
    });
};

exports.login = (req, res) => {
    User.findUser({username: req.body.username}, (err, user) => {
        if(err) {
            return res.status(500).send(`Something went wrong.`);
        }
        else if(user === null) {
            return res.status(422).send(`Your email address doesn't exist, check spelling or signup.`);
        }
        else {
            if(!user.isVerified){
                return res.status(401).send(`Your email address is not verified. please verify your email address to proceed`);
            } else if (req.body.password !== user.password){
                return res.status(422).send(`{error:Wrong Password}`);
            } else {
                let tokenData = {
                    username: user.username,
                    id: user._id
                };
                let result = {
                    username: user.username,
                    id: user._id,
                    token: JWT.sign(tokenData, privateKey)
                };
                return res.json(result);
            }
        }
    })
};

exports.verifyEmail = (req, res) => {
    Common.verifyToken(req, res, decoded => {
        User.findUser(decoded.id, decoded.username, (err, user) => {
            if(err) {
                return res.status(500).send(`something went wrong`);
            } else if (user === null) {
                return res.status(422).send(`Email not recognised`);
            } else  if (user.isVerified === true) {
                return res.json({message: `account is already verified.`})
            } else {
                user.isVerified = true;
                User.findUserUpdate({username: user.username}, user, (err, user) => {
                    if(!err) {
                        return res.json({message: `account sucessfully verified`});
                    } else {
                        console.log(err);
                        return res.status(500).send(`Something went wrong`);
                    }
                })
            }
        })
    })
};

exports.newPassword = (req, res) => {
    Common.verifyToken(req, res, decoded => {
        User.findUserByUserName(decoded.id, decoded.username, (err, User) => {
            if(err) return res.status(500).send(`Something went wrong`);
            else if(user === null) return res.status(422).send(`Email not recognized`);
            else if(req.body.newPassword !== req.body.confirmNew) return res.status(400).send(`Password mismatch`);
            else {
                user.password = Common.encrypt(req.body.newPassword);
                User.updateUser(user, (err, user) => {
                    if(!err) return res.json({message: `password successfully updated`});
                    else return res.status(500).send(`Something went wrong`);
                })
            }
        });
    })
};

exports.deleteUser = (req, res) => {
    Common.verifyToken(req, res, decoded => {
        if(req.body.username && req.body.username !== decoded.username) {
            User.removeUser(req.body.username);
            return res.json({message: `user successfully deleted`});
        }
    })
}

exports.getUsers = (req, res) => {
    Common.verifyTokenAdmin(req, res, () => {
        User.findAllUsers((err, users) => {
            if (err) return res.status(500).send(`Something went wrong`);
            else {
                let userMap = {};
                users.forEach(function (user) {
                    userMap[user._id] = user;
                });
                return res.send(userMap);
            }
        });
    })
};

exports.updateUserAdmin = (req, res) => {
    Common.verifyTokenAdmin(req, res, decoded => {
        User.findUser(req.body.id, req.body.username, (err, user) => {
            if(err) {
                return res.status(500).send(`something went wrong`);
            } else if (user === null) {
                return res.status(422).send(`User not found`);
            } else {

                let user = {
                    username: req.body.username,
                    isVerified: req.body.isVerified,
                    password: req.body.password,
                    billingAddress: req.body.billingAddress,
                    shippingAddress: req.body.shippingAddress
                }

                User.findUserUpdate(user, user, (err, user) => {
                    if(!err) {
                        return res.json({message: `account sucessfully verified`});
                    } else {
                        console.log(err);
                        return res.status(500).send(`Something went wrong`);
                    }
                })
            }
        })
    })
};

exports.updateUser = (req, res) => {
    Common.verifyToken(req, res, decoded => {
        User.findUser(decoded.id, decoded.username, (err, user) => {
            if(err) {
                return res.status(500).send(`something went wrong`);
            } else if (user === null) {
                return res.status(422).send(`User not found`);
            } else {
                let userData = {
                    username: req.body.username,
                    isVerified: req.body.isVerified,
                    password: req.body.password,
                    billingAddress: req.body.billingAddress,
                    shippingAddress: req.body.shippingAddress
                }
                User.findUserUpdate(user, user, (err, user) => {
                    if(!err) {
                        return res.json({message: `account sucessfully verified`});
                    } else {
                        console.log(err);
                        return res.status(500).send(`Something went wrong`);
                    }
                })
            }
        })
    })
};