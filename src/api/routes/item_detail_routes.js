const express = require('express');
const router = express.Router();
const itemDetailController = require('../controllers/item_detail_controller');

// Lấy danh sách chi tiết item của 1 item
router.get('/get-list-item-details', itemDetailController.getListItemDetails);

module.exports = router;