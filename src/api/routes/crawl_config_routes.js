const express = require('express');
const router = express.Router();
const crawlController = require('../controllers/crawl_config_controller');

// Kiểm tra tên của 1 phiên cấu hình thu thập đã tồn tại hay chưa
router.get('/check-name-exists/:name', crawlController.checkNameExists);

// Tạo mới 1 phiên cấu hình thu thập
router.post('/create', crawlController.create);

module.exports = router;