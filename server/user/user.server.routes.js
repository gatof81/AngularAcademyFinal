'use strict'

const User = require('./user.server.controller');

module.exports = function (app) {
    app.post('/api/user', User.create);
    app.post('/api/login', User.login);
    app.get('/api/verifyLink/:token', User.verifyEmail);
    app.put('/api/newPassword', User.newPassword);
    app.get('/api/allUsers', User.getUsers);
}