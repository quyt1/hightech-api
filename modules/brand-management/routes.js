const controller = require('./controller');
const express = require('express');
var router = express.Router();
const { Auth ,isSuperAdmin, isAdmin} = require('../../middle/AuthMiddleware')

router.get('/',Auth, controller.getAll);
router.post('/',isAdmin, controller.create);
router.get('/:id',Auth, controller.getOne);
router.put('/:id',isAdmin, controller.update);
router.delete('/:id',isAdmin, controller.deleteOne);



module.exports = router