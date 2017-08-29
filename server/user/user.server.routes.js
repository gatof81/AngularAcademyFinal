'use strict'

const User = require('./user.server.controller');

module.exports = function (app) {
    app.post('/api/user', User.create);
    app.post('/api/login', User.login);
    app.post('/api/verifyLink', User.verifyEmail);
    app.put('/api/newPassword', User.newPassword);
    app.get('/api/allUsers', User.getUsers);
}