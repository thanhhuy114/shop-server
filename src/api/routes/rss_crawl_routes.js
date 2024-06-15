const express = require('express');
const router = express.Router();
const rssCrawlController = require('../controllers/rss_crawl_controller');

// Thu thập dữ liệu, với cấu hình dược gửi từ client
router.post('/crawl-data', rssCrawlController.crawlingData);

// Thu thập lại dữ liệu của một phiên thu thập
router.get('/re-crawl-data/:id', rssCrawlController.reCrawlingData);

module.exports = router;