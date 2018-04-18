var User = require('../models/user');
var config = require('../config');

exports.index = function(req, res) {
    res.json({ success: true, error: null, message: 'users root' });
};

exports.register = function(req, res) {
    if(req.body.username && req.body.password && req.body.repeatPassword && (req.body.password == req.body.repeatPassword)) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        
        user.save(function(error) {
            if(error) {
                res.json({ success: false, error: error, message: 'creating user error' });
            } else {
                res.json({ success: true, error: null, message: 'user created' });
            }
        });

    } else {
        res.json({ success: false, error: null, message: 'invalid parameters' });
    }
};

exports.userinfo = function(req, res) {
    res.json({ success: false, error: null, message: 'serving user', user: req.user });
};