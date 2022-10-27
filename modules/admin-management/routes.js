const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin} = require('../../middle/AuthMiddleware')

router.use(isSuperAdmin)
router.get('/',controller.getAllAdmin);
router.post('/',controller.createAdmin);
router.get('/:id',controller.getOneAdmin);
router.put('/:id',controller.updateAdmin);
router.delete('/:id',controller.deleteOneAdmin);




module.exports = router