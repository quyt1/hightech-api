const controller = require('./controller');
const express = require('express');
var router = express.Router();
const upload = require('../../middle/upload')
const { Auth, isSuperAdmin, isAdmin } = require('../../middle/AuthMiddleware')
const ErrorHandler = require('../../middle/error-handler');


router.get('/', Auth, ErrorHandler(controller.getAll));
router.post('/', isAdmin, [upload.array('files')], ErrorHandler(controller.create));
router.get('/:id', Auth, ErrorHandler(controller.getOne));
router.put('/:id', isAdmin, ErrorHandler(controller.update));
router.delete('/:id', isAdmin, ErrorHandler(controller.deleteOne));

module.exports = router