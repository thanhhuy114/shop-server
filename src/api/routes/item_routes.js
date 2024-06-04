const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item_controller');

//Thu thập dữ liệu từ bằng HTML
router.get('/get-all', itemController.getAll);

module.exports = router;