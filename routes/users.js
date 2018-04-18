var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');
var authController = require('../controllers/authenticateController');

router.get('/', usersController.index);

router.post('/register', usersController.register);

router.use(authController.tokenAuth);

console.log(4);

router.get('/userInfo', usersController.userinfo);

module.exports = router;
