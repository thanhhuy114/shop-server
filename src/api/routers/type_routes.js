// routes.js
const express = require('express');
const router = express.Router();
const typeController = require('../controllers/type_controller');

// Routes cho loại thu thập
router.get('/get-all-crawl-types', typeController.getAllCrawlTypes);

// Routes cho loại kết quả
router.get('/get-all-crawl-result-types', typeController.getAllCrawlResultTypes);

// Routes cho loại hành động
router.get('/get-all-crawl-action-types', typeController.getAllCrawlActionTypes);

// Routes cho loại dữ liệu
router.get('/get-all-crawl-data-types', typeController.getAllCrawlDataTypes);

// Routes cho loại lựa chọn
router.get('/get-all-crawl-option-types', typeController.getAllCrawlOptionTypes);

// Routes cho loại điều kiện lựa chọn
router.get('/get-all-crawl-option-condition-types', typeController.getAllCrawlOptionConditionTypes);

// Routes cho loại sản phẩm
router.get('/get-all-item-types', typeController.getAllItemTypes);

// Routes cho tên website
router.get('/get-all-website-names', typeController.getAllWebsiteNames);

module.exports = router;
