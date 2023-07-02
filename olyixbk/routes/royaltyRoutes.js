const express = require('express');
const router = express.Router();
const royaltyController = require('../controllers/royaltyController');

router.get('/', royaltyController.getAll);
router.post('/', royaltyController.create);
router.get('/:id', royaltyController.getOne);
router.put('/:id', royaltyController.update);
router.delete('/:id', royaltyController.delete);

module.exports = router;
