const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item_controller');

// Lấy tất cả item
router.get('/get-all', itemController.getAll);

// Lấy danh sách item theo loại item
router.get('/get-list-item-by-item-type/:id', itemController.getListItemByItemType);

module.exports = router;
