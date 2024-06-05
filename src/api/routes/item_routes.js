const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item_controller');

// Lấy tất cả item
router.get('/get-all', itemController.getAll);

module.exports = router;
