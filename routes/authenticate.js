var express = require('express');
var router = express.Router();

var authController = require('../controllers/authenticateController');

router.get('/', authController.index);

router.post('/login', authController.authenticate);

module.exports = router;