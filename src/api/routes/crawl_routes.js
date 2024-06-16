const express = require('express');
const router = express.Router();
const crawlController = require('../controllers/crawl_controller');

// Thu thập dữ liệu, với cấu hình được gửi từ client
router.post('/crawl-data', crawlController.crawlingData);

// Thu thập lại dữ liệu của một phiên thu thập
router.get('/re-crawl-data/:id', crawlController.reCrawlingData);

module.exports = router;