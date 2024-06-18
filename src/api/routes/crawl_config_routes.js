const express = require('express');
const router = express.Router();
const crawlConfigController = require('../controllers/crawl_config_controller');

// Lấy tất cả thông tin cấu hình của một phiên thu tập
router.get('/get/:id', crawlConfigController.get);

// Lấy tất cả thông tin cấu hình của một phiên thu tập
router.get('/get-all', crawlConfigController.getAll);

// Kiểm tra tên của 1 phiên cấu hình thu thập đã tồn tại hay chưa
router.get('/check-name-exists/:name', crawlConfigController.checkNameExists);

// Tạo mới 1 phiên cấu hình thu thập
router.post('/create', crawlConfigController.create);

module.exports = router;