'use strict'

const User = require('./user.server.controller');

module.exports = function (app) {
    app.post('/api/user', User.create);
    app.post('/api/login', User.login);
    app.get('/api/verifyLink/:token', User.verifyEmail);
    app.put('/api/newPassword', User.newPassword);
    app.put('/api/updateUser', User.updateUser);
    app.get('/api/allUsers/:token', User.getUsers);
    app.delete('/api/deleteUser/:id', User.deleteUser)
}