'use strict'

const Common = require('../config/common');
const Config = require('../config/config');
const JWT = require('jsonwebtoken');
const User = require('../user/user.server.model').User;
const Prodcut = require('./product.server.model').Product;
const privateKey = Config.key.privateKey;
const async = require('async');

exports.create = (req, res) => {};
exports.delete = (req, res) => {};
exports.update = (req, res) => {};
exports.getById = (req, res) => {};
exports.getAll = (req, res) => {};