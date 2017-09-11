'use strict'

const express = require('express');
var cors = require('cors')
const app = express();
const config = require('./server/config/config');
const bodyParser = require('body-parser');
const db = require('./server/config/db');
const path = require('path');
const logger = require('morgan');

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/')));
app.use(logger('dev'));

require('./server/user/user.server.routes')(app);
require('./server/products/prodcut.server.routes')(app);
require('./server/orders/orders.server.routes')(app);

app.get('*', function (req,res) {
    res.sendFile(path.resolve('client/dist/index.html'));
})

let port = config.server.port;

app.listen(process.env.PORT || port);

console.log(`app started on port ${process.env.PORT || port}`);