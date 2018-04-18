var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');

exports.index = function(req, res) {
    res.json({ success: true, error: null, message: 'authentication root' });
}

exports.authenticate = function(req, res) {
    if(req.body.username && req.body.password) {
        User.findOne({ username: req.body.username }).select('username password').exec(function(error, user) {
            if(error) {
                return res.json({ success: false, error: error, message: 'could not fetch user' });
            } else if(!user) {
                return res.json({ success: false, error: error, message: 'could not fetch user' });
            } else {
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.json({ success: false, error: null, message: 'invalid username or password' });
                } else {
                    var token = jwt.sign({ username: user.username }, config.secret, { expiresIn: 60*60*24*7 });
                    res.json({ success: true, error: null, message: 'serving token', token: token });
                }
            }
        });
    } else {
        res.json({ success: false, error: null, message: 'invalid parameters' });
    }
}

exports.tokenAuth = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, function(error, decoded) {
            if(error) {
                res.json({ success: false, error: error, message: 'error verifying token' });
            } else if(decoded) {
                User.findOne({ username: decoded.username }, function(error, user) {
                    if(error) {
                        return res.json({ success: false, error: error, message: 'could not fetch user' });
                    } else if(!user) {
                        return res.json({ success: false, error: error, message: 'could not fetch user' });
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                return res.status(403).send({ success: false, error: null, message: 'invalid token' });
            }
        });
    } else {
        res.json({ success: false, error: null, message: 'invalid parameters' });
    }
};