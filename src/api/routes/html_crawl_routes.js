const express = require('express');
const router = express.Router();
const htmlCrawlController = require('../controllers/html_crawl_controller');

// Thu thập dữ liệu, với cấu hình dược gửi từ client
router.post('/crawl-data', htmlCrawlController.crawlingData);

// Thu thập lại dữ liệu của một phiên thu thập
router.get('/re-crawl-data/:id', htmlCrawlController.reCrawlingData);

module.exports = router;