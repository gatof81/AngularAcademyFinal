'use strict'

const Config = require('./config');
const nodemailer = require("nodemailer");
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const privateKey = Config.key.privateKey;

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: Config.email.username,
        pass: Config.email.password
    }
});

exports.decrypt = (password) => {
    return decrypt(password);
};

exports.encrypt = (password) => {
    return encrypt(password);
};

exports.verifyToken = (req, res, callback) => {
    return JWT.verify(req.headers['x-access-token'], privateKey, (err, decoded) => {
        if (err) return res.status(500).send(`Something went wrong: ${err.message}`);
        callback(decoded);
    });
};

exports.verifyTokenAdmin = (req, res, callback) => {
    return JWT.verify(req.headers['x-access-token'], privateKey, (err, decoded) => {
        if (err) return res.status(500).send(`Something went wrong: ${err.message}`);
        User.findUserByUserName(decoded.id, decoded.username, (err, user) => {
            if (err) return res.status(500).send(`Something went wrong`);
            else if (user.userRole === 2) {
                callback(decoded);
            } else {
                return res.status(403).send(`You need admin access for this request.`);
            }
        });
    });
};

exports.sentMailVerificationLink = (user, token, callback) => {
    let textLink = `http://${Config.server.host}:${Config.server.port}/${Config.email.verifyEmailUrl}/${token}`;
    let from = `Angular Academy<${Config.email.username}>`;
    let mailbody = `<p>Thanks for registering</p><p>Please verify your email by clicking on the following link.</p><br>
                    <a href=${textLink.toString()}>Verification link</a>`
    mail(from, user.username, `Account Verification`, mailbody, function (error, success) {
        callback(error, success);
    })
}

exports.sentMailVerificationLink = (user, token, callback) => {
    let textLink = `http://${Config.server.host}:${Config.server.port}/${Config.email.resetEmailUrl}/${token}`;
    let from = `Angular Academy<${Config.email.username}>`;
    let mailbody = `<p>Please reset your password by clicking on the following link.</p><br>
                    <a href=${textLink.toString()}>Reset password link</a>`
    mail(from, user.username, `Account new password`, mailbody, function (error, success) {
        callback(error, success);
    })
}

function decrypt(password){
    let decipher = crypto.createDecipher(algorithm, privateKey);
    let dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function encrypt(password){
    let cipher = crypto.createCipher(algorithm, privateKey);
    let crypted = cipher.update(password.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function mail(from, email, subject, mailbody, callback) {
    let options = {
        from: from,
        to: email,
        subject: subject,
        html: mailbody
    }

    smtpTransport.sendMail(options, function (error, response) {
        if(error){
            callback(error, null);
        }else{
            callback(null, response);
        }
        smtpTransport.close();
    });
}
