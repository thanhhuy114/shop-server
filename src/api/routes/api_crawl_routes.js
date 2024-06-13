const express = require('express');
const router = express.Router();
const apiCrawlController = require('../controllers/api_crawl_controller');

// Thu thập dữ liệu, với cấu hình dược gửi từ client
router.post('/crawl-data', apiCrawlController.crawlingData);

// Thu thập lại dữ liệu của một phiên thu thập
router.get('/re-crawl-data/:id', apiCrawlController.reCrawlingData);

module.exports = router;