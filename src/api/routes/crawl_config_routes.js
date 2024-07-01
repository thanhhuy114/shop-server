const express = require('express');
const router = express.Router();
const crawlConfigController = require('../controllers/crawl_config_controller');

// Lấy tất cả thông tin cấu hình của một phiên thu thập
router.get('/get/:id', crawlConfigController.get);

// Lấy tất cả cấu hình thu thập
router.get('/get-all', crawlConfigController.getAll);

// Lấy tất cả cấu hình thu thập của một user
router.get('/get-all-by-user-id/:user_id', crawlConfigController.getAllByUserId);

// Kiểm tra tên của 1 phiên cấu hình thu thập đã tồn tại hay chưa
router.get('/check-name-exists/:name', crawlConfigController.checkNameExists);

// Tạo mới 1 cấu hình thu thập
router.post('/create', crawlConfigController.create);

// Cập nhật thông tin 1 cấu hình
router.put('/update', crawlConfigController.update);

module.exports = router;