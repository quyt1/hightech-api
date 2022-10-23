const controller = require('./controller');
const express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteOne);



module.exports = router