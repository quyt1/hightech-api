const controller = require('./controller');
const express = require('express');
const upload = require('../../middle/upload')
var router = express.Router();
const { Auth ,isSuperAdmin, isAdmin} = require('../../middle/AuthMiddleware')
const ErrorHandler = require('../../middle/error-handler');

router.get('/',isAdmin, ErrorHandler(controller.getAll));
router.get('/:id',isAdmin, ErrorHandler(controller.getOne));
router.post('/check',Auth, ErrorHandler(controller.checkCode));
router.post('/',isAdmin, ErrorHandler(controller.create));
router.put('/:id',isAdmin, ErrorHandler(controller.update));
router.delete('/:id',isAdmin, ErrorHandler(controller.deleteOne));



module.exports = router