const controller = require('./controller');
const express = require('express');
var router = express.Router();

router.post('/login',controller.login);
router.post('/register',controller.register);
router.get('/logout',controller.logout);
router.get('/me',controller.getProlile);



module.exports = router